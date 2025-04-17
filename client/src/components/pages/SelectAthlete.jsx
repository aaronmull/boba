import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AthleteDropdown from "./elements/AthleteDropdown"

function SelectAthlete() {

    const [selectedAthlete, setSelectedAthlete] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!athlete) {
            setError(<p className="required">Missing an athlete.</p>)
        } else {
            setError('')
            navigate('/data/athlete/' + selectedAthlete)
        }
    }

    return (
        <>
            <h1>Select Athlete</h1>
            <form className="sessionForm">
                
                <label htmlFor="athlete">Select an athlete to view their data: </label>
                <AthleteDropdown selectedAthlete={selectedAthlete} setSelectedAthlete={setSelectedAthlete} />

                {error}

                <button type="submit" onClick={handleSubmit}>Continue</button>

            </form>
        </>
    )

}  

export default SelectAthlete