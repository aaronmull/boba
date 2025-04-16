import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Leaderboard from "./elements/Leaderboard"
import Chart from "./elements/Chart"

export default function Data() {

    const { metric } = useParams()
    
    const metricNames = {
        tenfly: "10-yd Fly",
        tenstart: "10-yd Start",
    }

    return (
        <div className="data">
            <h1>{metricNames[metric]} Data</h1>

            <ul>
                <Leaderboard metric={metric} />
                <Chart />
            </ul>
        </div>
    )
}