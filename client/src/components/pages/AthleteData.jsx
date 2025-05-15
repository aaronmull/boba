import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Chart from "./elements/Chart"
import Records from "./elements/Records"
import { deslugify } from "../utils/deslugify"



function AthleteData() {

    const { athlete } = useParams()
    const athleteName = deslugify(athlete)

    return (
        <>
            <h1>{athleteName}'s Data</h1>
            <Records athlete={athleteName}/>
        </>
    )
}


export default AthleteData