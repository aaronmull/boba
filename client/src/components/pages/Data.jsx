import { useParams } from "react-router-dom"
import { useContext } from "react"
import Context from '../Context'

export default function Data() {
    const userData = useContext(Context)
    const params = useParams()

    const metricNames = {
        tenfly: "10-yd Fly",
        tenstart: "10-yd Start",
    }

    return (
        <>
            <h1>{metricNames[params.metric]} Data</h1>
            <p>Current User: {userData.name}</p>
        </>
    )
}