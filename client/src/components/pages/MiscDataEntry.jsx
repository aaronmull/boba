import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import AthleteDropdown from "./elements/AthleteDropdown"
import MetricDropdown from "./elements/MetricDropdown"

function MiscDataEntry() {

    const [selectedAthlete, setSelectedAthlete] = useState('')
    const [selectedMetric, setSelectedMetric] = useState('')
    const [measurement, setMeasurement] = useState('')

    const [error, setError] = useState('')

    const date = localStorage.getItem("dataDate")

    const axiosPostData = async() => {
        const postData = {
            athlete: selectedAthlete,
            metric: selectedMetric,
            measurement: measurement,
            date: date,
        }

        await axios.post('http://localhost:4000/misc_data', postData)
        .then(res => setError(<p className="success">{res.data}</p>))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!selectedAthlete || !selectedMetric || !measurement){
            setError(<p className="required">Missing a data field. Please ensure you have specified an athlete, a metric, and a measurement.</p>)
        }
        else{
            setError('')
            axiosPostData()
            setSelectedAthlete('')
            setSelectedMetric('')
            setMeasurement('')
        }
    }

    return (
        <>
            <h1>New Miscellaneous Data Entry</h1>
            <form className="sessionForm">
                <label htmlFor="athlete">Select Athlete</label>
                <AthleteDropdown selectedAthlete={selectedAthlete} setSelectedAthlete={setSelectedAthlete} />

                <label htmlFor="metric">Metric</label>
                <MetricDropdown selectedMetric={selectedMetric} setSelectedMetric={setSelectedMetric} />

                <label htmlFor="measurement">Measurement</label>
                <input type="text" id="measurement" name="measurement" value={measurement} onChange={(e) => setMeasurement(e.target.value)} />

                {error}

                <button type="submit" onClick={handleSubmit}>Add Data</button>
            </form>
        </>
    )

}

export default MiscDataEntry