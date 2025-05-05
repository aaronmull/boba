import { useState, useEffect } from "react"
import axios from "axios"

function AddMetric() {

    const [metric, setMetric] = useState('')
    const [units, setUnits] = useState([])
    const [selectedUnits, setSelectedUnits] = useState('')
    const [error, setError] =  useState('')

    useEffect( () => {
        let processing = true
        axiosFetchData(processing)
        return () => {
            processing = false
        }
    }, [])

    const axiosFetchData = async(processing) => {
        await axios.get('http://localhost:4000/units')
        .then(res => {
            if(processing) {
                setUnits(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    const axiosPostData = async() => {
        
        const postData = {
            metric: metric,
            units: selectedUnits,
        }

        try {
            const res =  await axios.post('http://localhost:4000/misc_metrics', postData)
            setError(<p className="success">{res.data}</p>)
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError(<p className="required">That metric already exists.</p>)
            } else {
                setError(<p className="required">An unexpected error occurred.</p>)
            }
        }

    }

    const UnitsDropdown = () => {
        return (
            <select id="units" name="units" value={selectedUnits} onChange={ (e) => setSelectedUnits(e.target.value) }>
                <option value="" disabled>(none)</option>
                {
                    units?.map( (item, index) => (
                        <option value={item.units} key={index}>{item.units}</option>
                    ))
                }
            </select>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!metric || !selectedUnits){
            setError(<p className="required">Missing a data field. Please ensure you specified both a metric and units.</p>)
        }
        else{
            setError('')
            axiosPostData()
            setMetric('')
            setSelectedUnits('')
        }
    }

    return (
        <>
            <h1>Add New Miscellaneous Metric</h1>

            <form className="sessionForm">
                <label htmlFor="metric">Metric Name</label>
                <input type="text" id="metric" name="metric" value={metric} onChange={(e) => setMetric(e.target.value)} />

                <label htmlFor="units">Units</label>
                <UnitsDropdown />

                {error}

                <button type="submit" onClick={handleSubmit}>Add Metric</button>
            </form>
        </>
    )

}

export default AddMetric