import { createContext, useEffect, useReducer } from 'react';
import Reducer from './reducer';


const INTIAL_STATE = {
    user:null,
    isLoading: false,
    error: false
}

export const Context = createContext(INTIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INTIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <Context.Provider
            value={{
                user: state.user,
                isLoading: state.isLoading,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </Context.Provider>
    )
}


