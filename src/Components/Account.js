import React, {useContext} from 'react'
import {UserContext} from '../State/UserContext'

export default function Account(){

    const [user] = useContext(UserContext)
       
    return(
    <h2>Welcome, {String(user)} !</h2>
    )
}
            
  
