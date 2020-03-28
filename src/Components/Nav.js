import React, {useContext} from 'react'
import '../App.css'
import {Link, useHistory} from "react-router-dom"
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {UserContext} from '../State/UserContext'
import Cookies from 'js-cookie'
import {properties} from '../Properties/Properties'

export default function Nav(){

    const [user, setUser] = useContext(UserContext)
    console.log(user)
    const history = useHistory();

    //Runs on successful Login with Google
    ////////////////////////////////////////////////////////////
    const login = (response) => {
        console.log("google response: ",response);
        
        (async () => {
            const apiResponse  = await fetch('http://localhost:8080/oauth/authCode', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                body: JSON.stringify({"authCode":response['code']})
            });
            const apiResponseObject = apiResponse
            console.log(apiResponse)
            if(apiResponse.status===200){
                
                console.log("response: ",apiResponseObject)
                //nickname cookie is passed added by backed if login was successful
                setUser(Cookies.get('nickname'))
                history.push('/account')
            }else{
                setUser("*()failed")
            }
        })()
    }

    //Runs on Google's "Logout" button click
    ///////////////////////////////////////////////////////////////
    const logOut = () => {
        (async () => {
            const apiResponse  = await fetch('http://localhost:8080/oauth/logout', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Accept':'text/plain',
                    'Content-type':'text/plain'
                }
            });      
        })()

        Cookies.remove('nickname')
        setUser(undefined)
    }

    return(
        
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <span className="nav-link" href="/">Home <span className="sr-only">(current)</span></span>
                    </li>
                    <Link to="/about">
                    <li className="nav-item active">
                        <span className="nav-link">About <span className="sr-only">(current)</span></span>
                    </li>
                    </Link>
                    <Link to="/account">
                    <li className="nav-item active">
                        <span className="nav-link" >User <span className="sr-only">(current)</span></span>
                    </li>
                    </Link>
                </ul>
                {user===undefined || user==='*()failed' || user==='undefined' ?
                <GoogleLogin
                    clientId={properties.clientId}//add your google cliend ID to Properties/Properties.js
                    scope="profile email openid"
                    accessType="offline"
                    prompt="consent"
                    redirectUri={properties.backendPort}
                    responseType="code"
                    buttonText="Login"
                    onSuccess={login}
                    onFailure={login}
                    cookiePolicy={'single_host_origin'}
                    />
                    :
                    <GoogleLogout
                        clientId={properties.clientId}
                        buttonText="Logout"
                        onLogoutSuccess={logOut}
                    >
                    </GoogleLogout>}
              </div>
        </nav>
    );

}