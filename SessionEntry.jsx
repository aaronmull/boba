import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

function SessionEntry() {

    const params = useParams()

    const [athlete, setAthlete] = useState('')
    const [time, setTime] = useState('')
    const [error, setError] = useState('')
    const [selectData, setSelectData] = useState([])

    const date = localStorage.getItem("sessionDate")

    useEffect( () => {
        let processing = true
        axiosFetchData(processing)
        return () => {
            processing = false
        }
    }, [])

    const axiosFetchData = async(processing) => {
        await axios.get('http://localhost:4000/athletes')
        .then(res => {
            if(processing){
                setSelectData(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    const axiosPostData = async() => {
        const postData = {
            metric: params.metric,
            date: date,
            athlete: athlete,
            time: time,
        }

        await axios.post('http://localhost:4000/data', postData)
        .then(res => setError(<p className="success">{res.data}</p>))
    }

    const AthleteDropdown = () => {
        return (
            <select id="athlete" name="athlete" value={athlete} onChange={ (e) => setAthlete(e.target.value) }>
                <option value="" disabled>(none)</option>
                {
                    selectData?.map( (item) => (
                        <option value={item.athlete} key={item.athlete}>{item.athlete}</option>
                    ))
                }
            </select>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!athlete || !time){
            setError(<p className="required">Missing a data field. Please ensure you have specified both an athlete and a time.</p>)
        }
        else{
            setError('')
            axiosPostData()
            setAthlete('')
            setTime('')
        }
    }

    return (
        <>
            <h1>New {params.metric} Session</h1>
            
            <form className="sessionForm">
                <label htmlFor="athlete">Select Athlete</label>
                <AthleteDropdown />

                <label htmlFor="time">Time</label>
                <input type="number" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />

                {error}

                <button type="submit" onClick={handleSubmit}>Add Time</button>
            </form>
        </>
    )

}

export default SessionEntry