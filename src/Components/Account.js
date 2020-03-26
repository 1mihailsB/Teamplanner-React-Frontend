import React, {useContext} from 'react'
import {UserContext} from '../State/UserContext'
import Cookies from 'js-cookie'
import Unauthorized from './Unauthorized'

export default function Account(){

    const [user, setUser] = useContext(UserContext)
    console.log(user)
    console.log(Cookies.get('user'))
       
    return(
    <h2>Welcome, {String(user)} !</h2>
    )
}
            
  
