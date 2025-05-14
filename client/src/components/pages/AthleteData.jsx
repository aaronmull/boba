import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Chart from "./elements/Chart"



function AthleteData() {

    const { athlete } = useParams()

    return (
        <>
            <h1>{athlete}'s Data</h1>
        </>
    )
}


export default AthleteData