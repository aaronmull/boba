import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import AthleteDropdown from "./elements/AthleteDropdown"

function SessionEntry() {

    const params = useParams()

    const [selectedAthlete, setSelectedAthlete] = useState('')
    const [time, setTime] = useState('')
    const [error, setError] = useState('')

    const [performanceData, setPerformanceData] = useState([])

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

    useEffect(() => {
        axios.get(`http://localhost:4000/data/${params.metric}`)
            .then(res => {
                console.log("Fetched data:", res.data)
                setPerformanceData(res.data)
            })
            .catch(err => console.log(err))
    }, [params.metric])

    const getBestEntry = () => {
        if (!selectedAthlete) return null
        
        const filtered = performanceData.filter(entry =>
            entry.athlete === selectedAthlete
        )

        if (filtered.length === 0) return null

        return filtered.reduce((best, current) => 
            Number(current.time) < Number(best.time) ? current : best
        )
    }
    
    const getBestTime = () => {
        const best = getBestEntry()
        return best ? Number(best.time) : null
    }

    const getBestDate = () => {
        const best = getBestEntry()
        return best ? new Date(best.date).toLocaleDateString('en-US', { timeZone: 'UTC' }) : null
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

                {selectedAthlete && (
                    <p>
                        PR: <strong>{getBestTime() ?? "N/A"}</strong>
                        {getBestDate() && <span> on {getBestDate()}</span>}
                    </p>
                )}

                {error}

                <button type="submit" onClick={handleSubmit}>Add Time</button>
            </form>
        </>
    )

}

export default SessionEntry