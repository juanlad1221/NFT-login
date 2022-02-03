import axios from "axios";
import {useState, useEffect} from 'react'

function useAxiosPost (url, dataToSend) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
   
    useEffect(() => {
        setLoading(true)
        
        axios.post(url, dataToSend)
        .then(resp => setData(resp.data))
        .catch(err => setError(err))
        .finally(setLoading(false))

    }, [url])
    
    return {data, error, loading}
}

export default useAxiosPost
