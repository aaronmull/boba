import { useParams } from "react-router-dom"

export default function Data() {
    const params = useParams()

    const metricNames = {
        tenfly: "10-yd Fly",
        tenstart: "10-yd Start",
    }

    return (
        <>
            <h1>{metricNames[params.metric]} Data</h1>
        </>
    )
}