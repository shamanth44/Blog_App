import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../features/user/auth';


function OpenRoute({children}) {
    const { isAuthenticated, loading } = useAuth();
    if(loading){
        // return <div>Loading...</div>
        return null
    }
    return isAuthenticated === false ? children : (<Navigate to="/"/>)
}

export default OpenRoute;