import { useState, useEffect } from "react"
import axios from "axios"
import Leaderboard from "./elements/Leaderboard"
import Chart from "./elements/Chart"

export default function Data() {

    const [selectedMetric, setSelectedMetric] = useState('')
    const [allData, setAllData] = useState({})
    const [metricDefinitions, setMetricDefinitions] = useState([])

    useEffect(() => {
        
        const fetchAll = async () => {
            try {
                const [flyRes, startRes, miscDataRes, miscDefsRes] = await Promise.all([
                    axios.get('http://localhost:4000/data/tenfly'),
                    axios.get('http://localhost:4000/data/tenstart'),
                    axios.get('http://localhost:4000/data/misc_data'),
                    axios.get('http://localhost:4000/data/misc_metrics'),
                ])

                const miscGrouped = {}

                miscDataRes.data.forEach(entry => {
                    if (!miscGrouped[entry.metric]) {
                        miscGrouped[entry.metric] = []
                    }
                    miscGrouped[entry.metric].push({
                        ...entry,
                        time: Number(entry.numericValue) // may not be time, but some other numeric value like broadjump
                    })
                })

                setAllData({
                    tenfly: flyRes.data.map(e => ({ ...e, time: Number(e.time)})),
                    tenstart: startRes.data.map(e => ({ ...e, time: Number(e.time)})),
                    ...miscGrouped,
                })

                setMetricDefinitions([
                    { metric: 'tenfly', label: '10-yd Fly'},
                    { metric: 'tenstart', label: '10-yd Start'},
                    ...miscDefsRes.data,
                ])

                setSelectedMetric('tenfly') // Default view on Data page

            } catch (err) {
                console.log(err)
            }
        }

        fetchAll()

    }, [])

    const selectedMetricDef = metricDefinitions.find(def => def.metric === selectedMetric);
    const units = 
        selectedMetric === 'tenfly' || selectedMetric === 'tenstart'
        ? 's'
        : selectedMetricDef?.units || '';

    return (
        <div className="data">
            <h1>{(metricDefinitions.find(m => m.metric === selectedMetric)?.label || selectedMetric) + " Data"}</h1>

            <label>Select Metric: </label>
            <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
                {metricDefinitions.map(def => (
                    <option key={def.metric} value={def.metric}>
                        {def.label || def.metric}
                    </option>
                ))}
            </select>

            <ul>
                <Leaderboard metric={selectedMetric} data={allData[selectedMetric] || []} units={units}/>
                <Chart data={allData[selectedMetric] || []} units={units}/>
            </ul>
        </div>
    )
}