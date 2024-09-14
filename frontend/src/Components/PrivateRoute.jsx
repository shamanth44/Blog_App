import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../features/user/auth';

function PrivateRoute({children}) {
    const { isAuthenticated, loading } = useAuth();

    if(loading) {
        // return <div className='px-20 text-3xl text-black font-bold'>Loading...</div>
        return children
    }

    return isAuthenticated === true ? children : (<Navigate to="/signin"/>)
}

export default PrivateRoute;