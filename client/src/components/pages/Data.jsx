import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Leaderboard from "./elements/Leaderboard"
import Chart from "./elements/Chart"

export default function Data() {

    const { metric } = useParams()
    const [data, setData] = useState([])
    
    const metricNames = {
        tenfly: "10-yd Fly",
        tenstart: "10-yd Start",
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/data/${metric}`)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [metric])

    return (
        <div className="data">
            <h1>{metricNames[metric]} Data</h1>

            <ul>
                <Leaderboard metric={metric} data={data} />
                <Chart data={data} />
            </ul>
        </div>
    )
}