import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"



function Records({ athlete }) {

    const [tenflyData, setTenflyData] = useState([])
    const [tenstartData, setTenStartData] = useState([])
    const [miscData, setMiscData] = useState([])
    const [metricDefinitions, setMetricDefinitions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/data/tenfly')
            .then(res => setTenflyData(res.data))
            .catch(err => console.log(err))
 
        axios.get('http://localhost:4000/data/tenstart')
            .then(res => setTenStartData(res.data))
            .catch(err => console.log(err))
 
        axios.get('http://localhost:4000/data/misc_data')
            .then(res => setMiscData(res.data))
            .catch(err => console.log(err))

        axios.get('http://localhost:4000/data/misc_metrics')
            .then(res => setMetricDefinitions(res.data))
            .catch(err => console.log(err));
    }, [])

    const getBestEntry = (entries, isTimeBased = true) => {
        
        if (!entries || entries.length === 0) return null

        return entries.reduce((best, current) => {
            const a = Number(best.time ?? best.measurement)
            const b = Number(current.time ?? current.measurement)
            return isTimeBased
                ? (b < a ? current : best)
                : (b > a ? current : best)
        })

    }

    const athleteTenfly = tenflyData.filter(entry => entry.athlete === athlete)
    const athleteTenstart = tenstartData.filter(entry => entry.athlete === athlete)
    const athleteMisc = miscData.filter(entry => entry.athlete === athlete)

    const bestTenfly = getBestEntry(athleteTenfly, true)
    const bestTenstart = getBestEntry(athleteTenstart, true)

    const bestMisc = []
    const grouped = {}

    athleteMisc.forEach(entry => {
        
        if(!grouped[entry.metric]) {
            grouped[entry.metric] = []
        }

        grouped[entry.metric].push(entry)

    })

    Object.entries(grouped).forEach(([metric, entries]) => {

        const def = metricDefinitions.find(def => def.metric === metric)
        const units = def?.units ?? ''
        const isTimeBased = units === 's'

        const best = getBestEntry(entries, isTimeBased)
        if (best) {
            bestMisc.push({
                ...best,
                units: units
            })
        }

    })


    return (
        <div className="leaderboard">
            <h3>Personal Bests</h3>
            <ul>
                {bestTenfly && (
                    <li>
                        <strong>10-yd Fly:</strong> {bestTenfly.time}s on {new Date(bestTenfly.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                    </li>
                )}
                {bestTenstart && (
                    <li>
                        <strong>10-yd Start:</strong> {bestTenstart.time}s on {new Date(bestTenstart.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                    </li>
                )}
                {bestMisc.map(entry => (
                    <li key={entry.metric}>
                        <strong>{entry.metric}:</strong> {entry.measurement} {entry.units} on {new Date(entry.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default Records