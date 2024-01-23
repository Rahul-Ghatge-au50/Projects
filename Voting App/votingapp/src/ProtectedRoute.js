import React, { useContext } from 'react'
import { Context } from './Context/context'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    const {user} = useContext(Context);

    if(!user){
        navigate('/')
    }else{
        return children;
    }
}

export default ProtectedRoute
