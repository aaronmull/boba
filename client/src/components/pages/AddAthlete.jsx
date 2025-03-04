import { useState, useEffect } from "react"
import axios from "axios"

function AddAthlete() {
    
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [sports, setSports] = useState([])
    const [selectedSport, setSelectedSport] = useState('')
    const [error, setError] =  useState('')

    useEffect( () => {
        let processing = true
        axiosFetchData(processing)
        return () => {
            processing = false
        }
    }, [])

    const axiosFetchData = async(processing) => {
        await axios.get('http://localhost:4000/sports')
        .then(res => {
            if(processing) {
                setSports(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    const axiosPostData = async() => {
        const postData = {
            name: name,
            gender: gender,
            sport: selectedSport,
        }

        await axios.post('http://localhost:4000/new-athletes', postData)
        .then(res => setError(<p className="success">{res.data}</p>))
    }

    const SportDropdown = () => {
        return (
            <select id="sport" name="sport" value={selectedSport} onChange={ (e) => setSelectedSport(e.target.value) }>
                <option value="" disabled>(none)</option>
                {
                    sports?.map( (item) => (
                        <option value={item.sport} key={item.sport}>{item.sport}</option>
                    ))
                }
            </select>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!name || !selectedSport){
            setError(<p className="required">Missing a data field. Please ensure you specified both a name and a sport.</p>)
        }
        else{
            setError('')
            axiosPostData()
            setName('')
            setGender('')
            setSelectedSport('')
        }
    }
    
    return(
        <>
            <h1>Add New Athlete</h1>

            <form className="sessionForm">
                <label htmlFor="name">Athlete Name</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="" disabled>(none)</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <label htmlFor="sport">Sport</label>
                <SportDropdown />

                {error}

                <button type="submit" onClick={handleSubmit}>Add Athlete</button>
            </form>
        </>
    )
}

export default AddAthlete