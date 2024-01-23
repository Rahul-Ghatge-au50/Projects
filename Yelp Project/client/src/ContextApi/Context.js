import { useState,createContext } from "react";


//Context name
export const ResturantContext = createContext();


//Context Funxtion/Provider
export const ContextProvider = ({children}) => {

    const [resturant,setResturant] = useState([]);

    const addResturant = (resturant) => {
        setResturant([...resturant,resturant])
    }

    return (
        <ResturantContext.Provider value={{resturant,setResturant,addResturant}}>
            {children}
        </ResturantContext.Provider>
    )
}