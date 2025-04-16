import { useState, useEffect } from "react"
import axios from "axios"
import AthleteDropdown from "./AthleteDropdown"
import {LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from "recharts"


function Chart({ data }) {

    const [selectedAthlete, setSelectedAthlete] = useState('')
    const [athleteData, setAthleteData] = useState([])

    const getAthleteData = () => {
        if(!selectedAthlete) return []

        return data
            .filter(entry => entry.athlete === selectedAthlete)
            .map(entry => ({
                date: new Date(entry.date).toLocaleDateString(),
                time: entry.time
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date))
    }

    useEffect(() => {
        setAthleteData(getAthleteData())
    }, [selectedAthlete, data])

    return(
        <div className="chart">
            <label htmlFor="athlete">Select Athlete: </label>
            <AthleteDropdown selectedAthlete={selectedAthlete} setSelectedAthlete={setSelectedAthlete} />
            
            {selectedAthlete && athleteData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart 
                        data={athleteData}
                        width={500}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="time" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <p>Select an athlete to see their time progression.</p>
            )}
        </div>
    )
}

export default Chart