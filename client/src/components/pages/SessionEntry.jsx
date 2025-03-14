import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import AthleteDropdown from "./elements/AthleteDropdown"

function SessionEntry() {

    const params = useParams()

    const [selectedAthlete, setSelectedAthlete] = useState('')
    const [time, setTime] = useState('')
    const [error, setError] = useState('')

    const date = localStorage.getItem("sessionDate")

    const axiosPostData = async() => {
        const postData = {
            metric: params.metric,
            date: date,
            athlete: selectedAthlete,
            time: time,
        }

        await axios.post('http://localhost:4000/data', postData)
        .then(res => setError(<p className="success">{res.data}</p>))
    }

    const metricNames = {
        tenfly: "10-yd Fly",
        tenstart: "10-yd Start",
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!selectedAthlete || !time){
            setError(<p className="required">Missing a data field. Please ensure you have specified both an athlete and a time.</p>)
        }
        else{
            setError('')
            axiosPostData()
            setSelectedAthlete('')
            setTime('')
        }
    }

    return (
        <>
            <h1>New { metricNames[params.metric] || params.metric } Session</h1>
            
            <form className="sessionForm">
                <label htmlFor="athlete">Select Athlete</label>
                <AthleteDropdown selectedAthlete={selectedAthlete} setSelectedAthlete={setSelectedAthlete} />

                <label htmlFor="time">Time</label>
                <input type="number" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />

                {error}

                <button type="submit" onClick={handleSubmit}>Add Time</button>
            </form>
        </>
    )

}

export default SessionEntry