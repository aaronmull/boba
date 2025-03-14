import { useState, useEffect } from "react"
import axios from "axios"

function AthleteDropdown({selectedAthlete, setSelectedAthlete}) {

    const [athletes, setAthletes] = useState([])

    useEffect( () => {
        let processing = true
        axiosFetchData(processing)
        return () => {
            processing = false
        }
    }, [])

    const axiosFetchData = async(processing) => {
        await axios.get('http://localhost:4000/athletes')
        .then(res => {
            if(processing){
                setAthletes(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <select id="athlete" name="athlete" value={selectedAthlete} onChange={ (e) => setSelectedAthlete(e.target.value) }>
            <option value="" disabled>(none)</option>
            {
                athletes?.map( (item) => (
                    <option value={item.name} key={item._id}>{item.name}</option>
                ))
            }
        </select>
    )
}

export default AthleteDropdown