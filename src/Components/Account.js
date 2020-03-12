import React, {useContext} from 'react'
import {UserContext} from '../State/UserContext'
import Cookies from 'js-cookie'
import Unauthorized from './Unauthorized'

export default function Account(){

    const [user, setUser] = useContext(UserContext)
    console.log(user)
    console.log(Cookies.get('user'))
       
        if (user != undefined&& user != "#$%^failed"){
            return(<h2>Welcome, {String(user)} !</h2>)
        }
        else if(user==undefined){
            return <Unauthorized />
        }else{
            return(<h2>Login error, please try again</h2>)
        }
      
}
            
  
