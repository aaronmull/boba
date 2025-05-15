import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import AthleteDropdown from "./elements/AthleteDropdown"
import MetricDropdown from "./elements/MetricDropdown"

function MiscDataEntry() {

    const [selectedAthlete, setSelectedAthlete] = useState('')
    const [selectedMetric, setSelectedMetric] = useState('')
    const [measurement, setMeasurement] = useState('')

    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');

    const [miscData, setMiscData] = useState([])
    const [metricDefinitions, setMetricDefinitions] = useState([])
    const [error, setError] = useState('')

    const date = localStorage.getItem("dataDate")

    useEffect(() => {
        axios.get('http://localhost:4000/data/misc_data')
            .then(res => setMiscData(res.data))
            .catch(err => console.log(err))

        axios.get('http://localhost:4000/data/misc_metrics')
            .then(res => setMetricDefinitions(res.data))
            .catch(err => console.log(err))
    }, [])

    const axiosPostData = async() => {

        const metricDef = metricDefinitions.find(def => def.metric === selectedMetric)
        const units = metricDef?.units ?? ''

        let numericValue
        let formattedMeasurement

        if (units === 'ft.') {
            const ft = Number(feet)
            const inch = Number(inches)

            if (isNaN(ft) || isNaN(inch)) {
                setError(<p className="required">Feet and inches must be numbers.</p>)
                return
            }
            
            numericValue = ft * 12 + inch
            formattedMeasurement = `${ft}'${inch}"`
        } else {
            numericValue = Number(measurement)
            if (isNaN(numericValue)) {
                setError(<p className="required">Measurement must be numbers.</p>)
                return
            }
            formattedMeasurement = measurement
        }

        const postData = {
            athlete: selectedAthlete,
            metric: selectedMetric,
            measurement: formattedMeasurement,
            numericValue: numericValue,
            date: date,
        }

        await axios.post('http://localhost:4000/misc_data', postData)
        .then(res => setError(<p className="success">{res.data}</p>))
    }

    const getBestEntry = () => {

        if (!selectedAthlete || !selectedMetric) return null

        const filtered = miscData.filter(entry => 
            entry.athlete   === selectedAthlete &&
            entry.metric    === selectedMetric
        )

        if (filtered.length === 0) return null
        
        const metricDef = metricDefinitions.find(def => def.metric === selectedMetric)
        const units = metricDef?.units
        const isTimeMetric = units === "s"

        return filtered.reduce((best, current) =>
            isTimeMetric
                ? Number(current.measurement) < Number(best.measurement) ? current : best
                : Number(current.measurement) > Number(best.measurement) ? current : best
        )

    }

    const getBestMeasurement = () => {
        const best = getBestEntry()
        return best ? Number(best.measurement) : null
    }

    const getBestDate = () => {
        const best = getBestEntry()
        return best ? new Date(best.date).toLocaleDateString('en-US', { timeZone: 'UTC' }) : null
    }

    const getUnitsForMetric = () => {
        const metricDef = metricDefinitions.find(def => def.metric === selectedMetric)
        return metricDef?.units || ""
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const units = getUnitsForMetric()

        const missingRegular = units !== 'ft.' && !measurement
        const missingFeet = units === 'ft.' && (!feet || !inches)

        if(!selectedAthlete || !selectedMetric || missingRegular || missingFeet){
            setError(<p className="required">Missing a data field. Please ensure you have specified an athlete, a metric, and a measurement.</p>)
        }
        else{
            setError('')
            axiosPostData()
            setSelectedAthlete('')
            setSelectedMetric('')
            setMeasurement('')
            setFeet('')
            setInches('')
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

                {/* <label htmlFor="measurement">Measurement</label>
                <input type="text" id="measurement" name="measurement" value={measurement} onChange={(e) => setMeasurement(e.target.value)} /> */}

                {getUnitsForMetric() === 'ft.' ? (
                    <>
                        <label>Feet</label>
                        <input type="number" value={feet} onChange={(e) => setFeet(e.target.value)} />

                        <label>Inches</label>
                        <input type="number" value={inches} onChange={(e) => setInches(e.target.value)} />
                    </>
                ) : (
                    <>
                        <label htmlFor="measurement">Measurement</label>
                        <input
                            type="text"
                            id="measurement"
                            name="measurement"
                            value={measurement}
                            onChange={(e) => setMeasurement(e.target.value)}
                        />
                    </>
                )}

                {selectedAthlete && selectedMetric && (
                    <p>
                        Best: <strong>{getBestMeasurement() ?? "N/A"} {getUnitsForMetric()}</strong>
                        {getBestDate() && <span> on {getBestDate()}</span>}
                    </p>
                )}

                {error}

                <button type="submit" onClick={handleSubmit}>Add Data</button>
            </form>
        </>
    )

}

export default MiscDataEntry