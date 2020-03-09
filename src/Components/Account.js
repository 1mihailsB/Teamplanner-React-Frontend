import React, {useContext} from 'react'
import {UserContext} from '../State/UserContext'
import Cookies from 'js-cookie'

export default function Account(){

    const [user, setUser] = useContext(UserContext)
    console.log(user)
    console.log(Cookies.get('user'))
       
        if (user != undefined&& user != "#$%^failed"){
            return(<h2>Welcome, {String(user)} !</h2>)
        }
        else if(user==undefined){
            return(<h2>Please log in</h2>)
        }else{
            return(<h2>Login error, please try again</h2>)
        }
      
}
            
  
