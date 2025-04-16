import { useState, useEffect } from "react"
import axios from "axios"
import AthleteDropdown from "./AthleteDropdown"

function Chart() {

    const [selectedAthlete, setSelectedAthlete] = useState('')

    return(
        <div className="chart">
            <label htmlFor="athlete">Select Athlete: </label>
            <AthleteDropdown selectedAthlete={selectedAthlete} setSelectedAthlete={setSelectedAthlete} />
            <p>Hello. This is the Chart.jsx component.</p>
        </div>
    )
}

export default Chart