import React,{useState, createContext, useEffect} from 'react'
import Cookies from 'js-cookie'

export const UserContext = createContext()

export const UserProvider = (props) =>{
    
    const [user, setUser] = useState(Cookies.get('nickname'))
    console.log("context")
    return(
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}