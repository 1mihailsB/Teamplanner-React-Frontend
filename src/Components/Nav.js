import React, {useContext} from 'react'
import '../App.css'
import {Link, useHistory} from "react-router-dom"
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {UserContext} from '../State/UserContext'
import Cookies from 'js-cookie'
import {properties} from '../Properties/Properties'

export default function Nav(){

    const [loggedUser, setUser] = useContext(UserContext)
    console.log(loggedUser)
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
            const apiResponseObject = await apiResponse.json()
            console.log(apiResponse)
            if(apiResponse.status==200){
                console.log("apiResponseObject: ", apiResponseObject)
                Cookies.set('user', apiResponseObject['given_name'])
                console.log("user: ",apiResponseObject['given_name'])
                setUser(Cookies.get('user'))
            }else{
                setUser('#$%^failed')
            }
        })()
    }

    //Runs on Google's "Logout" button click
    ///////////////////////////////////////////////////////////////
    const logOut = () => {
        Cookies.remove('user')
        console.log("logOut")
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
                {loggedUser===undefined || loggedUser==='#$%^failed' ||  loggedUser==='undefined'?
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
                        clientId="586290009563-ki3e28o344hisjirre95tp6ui4sl8oh2.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={logOut}
                    >
                    </GoogleLogout>}
              </div>
        </nav>
    );

}