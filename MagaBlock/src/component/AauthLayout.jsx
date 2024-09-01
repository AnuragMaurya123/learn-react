import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AauthLayout ({children, authentication=true}) {
    const navigate=useNavigate
    const [loader, setloader] = useState(true)
    const authStatus=useSelector(state=> state.auth.status)

    useEffect(()=>{
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        } 
        setloader(false)
    },[authentication,authStatus,navigate])

  return loader ? <h1>Loading....</h1>:<>{children}</>
}


