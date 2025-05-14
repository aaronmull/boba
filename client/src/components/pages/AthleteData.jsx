import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Chart from "./elements/Chart"
import { deslugify } from "../utils/deslugify"



function AthleteData() {

    const { athlete } = useParams()
    const athleteName = deslugify(athlete)

    return (
        <>
            <h1>{athleteName}'s Data</h1>
        </>
    )
}


export default AthleteData