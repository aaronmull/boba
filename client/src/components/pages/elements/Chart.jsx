import { useState, useEffect } from "react"
import AthleteDropdown from "./AthleteDropdown"
import {LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from "recharts"


function Chart({ data }) {

    const [selectedAthlete, setSelectedAthlete] = useState('')
    const [athleteData, setAthleteData] = useState([])

    const getAthleteData = () => {
        if(!selectedAthlete) return []

        const entriesByDate = {}

        data
            .filter(entry => entry.athlete === selectedAthlete)
            .forEach(entry => {
                
                const date = new Date(entry.date).toLocaleDateString('en-US', { timeZone: 'UTC' })

                if(!entriesByDate[date] || entry.time < entriesByDate[date].time) {
                    entriesByDate[date] = {
                        date,
                        time: Number(entry.time),
                    }
                }
            })
        
            return Object.values(entriesByDate)
                .sort((a, b) => new Date(a.date) - new Date(b.date))

    }

    useEffect(() => {
        setAthleteData(getAthleteData())
    }, [selectedAthlete, data])


    const CustomTooltip = ({ active, payload, label }) => {
        if( active && payload && payload.length ) {
            return (
                <div className="tooltip">
                    <p>{label}</p>
                    <p>Time:
                        <span> {payload[0].value}</span>
                    </p>
                </div>
            )
        }

    }

    return(
        <div className="chart">
            <label htmlFor="athlete">Select Athlete: </label>
            <AthleteDropdown selectedAthlete={selectedAthlete} setSelectedAthlete={setSelectedAthlete} />
            {selectedAthlete && athleteData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={athleteData} width={750}>
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="date" />
                        <YAxis dataKey="time" domain={['auto', 'auto']} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="time" stroke="#3b82f6" />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <p>Select an athlete to see their time progression.</p>
            )}
        </div>
    )
}

export default Chart