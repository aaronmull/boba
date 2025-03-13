import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Data() {

    const { metric } = useParams()
    
    const [data, setData] = useState([])
    const [athletes, setAthletes] = useState([])

    const [selectedGender, setSelectedGender] = useState('All')
    const [selectedSport, setSelectedSport] = useState('All')
    
    const [showAll, setShowAll] = useState(false)

    const metricNames = {
        tenfly: "10-yd Fly",
        tenstart: "10-yd Start",
    }

    useEffect( () => {
        let processing = true
        fetchData(processing)
        fetchAthletes(processing)
        return () => {
            processing = false
        }
    }, [metric])

    const fetchData = async(processing) => {
        await axios.get(`http://localhost:4000/data/${metric}`)
        .then(res => {
            if(processing){
                setData(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    const fetchAthletes = async(processing) => {
        await axios.get('http://localhost:4000/athletes')
        .then(res => {
            if(processing){
                setAthletes(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    const getLeaderboardData = () => {
        
        const fastestTimes = new Map()

        data.forEach(entry => {
            const existingEntry = fastestTimes.get(entry.athlete)
            if ( !existingEntry || entry.time < existingEntry.time) {
                fastestTimes.set(entry.athlete, entry)
            }
        })
        
        return Array.from(fastestTimes.values())
            .map(entry => ({
                ...entry,
                athleteInfo: athletes.find(a => a.name === entry.athlete) || {},  
            }))
            .filter(entry => selectedGender === "All" || entry.athleteInfo.gender === selectedGender)
            .filter(entry => selectedSport === "All" || entry.athleteInfo.sport === selectedSport)
            .sort((a, b) => a.time - b.time)
    }

    const leaderboardData = getLeaderboardData()
    const visibleData = showAll ? leaderboardData : leaderboardData.slice(0, 10)

    return (
        <>
            <h1>{metricNames[metric]} Data</h1>

            <div>
                <div className="leaderboard">
                    {/* Filter Dropdowns */}
                    <label>Gender: </label>
                    <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <label>Sport: </label>
                    <select value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}>
                        <option value="All">All</option>
                        {Array.from(new Set(athletes.map(a => a.sport))).map(sport => (
                            <option key={sport} value={sport}>{sport}</option>
                        ))}
                    </select>

                    {/* Leaderboard */}
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Athlete</th>
                                <th>Time (s)</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleData.map((entry, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{entry.athlete}</td>
                                    <td>{entry.time}</td>
                                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Show More / Less Button */}
                    {leaderboardData.length > 10 && (
                        <button onClick={() => setShowAll(!showAll)}>
                            {showAll ? "Show Less" : "Show More"}
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}