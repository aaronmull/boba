import { useState } from "react"
import { useNavigate } from "react-router-dom"

function NewSession() {

    const [metric, setMetric] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!metric || !date) {
            setError(<p className="required">Missing a data field. Please ensure you have specified both a metric and a date.</p>)
        } else {
            setError('')
            localStorage.setItem("sessionDate", date)
            navigate('/new-session/' + metric)
        }
    }

    return(
        <>
            <h1>New Speed Session</h1>

            <form className="sessionForm">
                <label htmlFor="metric">Metric</label>
                <select id="metric" name="metric" value={metric} onChange={ (e) => setMetric(e.target.value)}>
                    <option value="" disabled>(none)</option>
                    <option value="tenstart">10-yd Start</option>
                    <option value="tenfly">10-yd Fly</option>
                </select>

                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={date} onChange={ (e) => setDate(e.target.value) }/>
                
                {error}

                <button type="submit" onClick={handleSubmit}>Continue</button>
            </form>
        </>
    )
}

export default NewSession