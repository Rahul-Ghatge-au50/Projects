import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Context } from './Context/Context';


function ProtectedRoute({ children }) {
    const {user} = useContext(Context);

    //console.log(user?.token);
    if (!user) {
        return <Navigate to='/Login' />
    } else {
        return children;
    }
}

export default ProtectedRoute
