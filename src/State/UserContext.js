import React,{useState, createContext, useEffect} from 'react'
import Cookies from 'js-cookie'

export const UserContext = createContext()

export const UserProvider = (props) =>{
    const [user, setUser] = useState(undefined)

    useEffect (()=>{

        setUser(Cookies.get('user'))
        console.log("user context effect: ", user, user===undefined)
    },[])

    return(
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}