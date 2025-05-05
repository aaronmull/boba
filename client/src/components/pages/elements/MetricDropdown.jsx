import { useState, useEffect } from "react"
import axios from "axios"

function MetricDropdown({ selectedMetric, setSelectedMetric }) {

    const [metrics, setMetrics] = useState([])

    useEffect(() => {
        let processing = true
        axiosFetchData(processing)
        return () => {
            processing = false
        }
    }, [])

    const axiosFetchData = async (processing) => {
        try {
            const res = await axios.get('http://localhost:4000/data/misc_metrics')
            if (processing) {
                setMetrics(res.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <select id="metric" name="metric" value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
            <option value="" disabled>(none)</option>
            {
                metrics?.map((item) => (
                    <option value={item.metric} key={item._id}>
                        {item.metric} ({item.units})
                    </option>
                ))
            }
        </select>
    )
}

export default MetricDropdown
