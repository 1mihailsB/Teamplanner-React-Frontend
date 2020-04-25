import React, {useContext, useState,useEffect } from 'react'
import {Link, useHistory, useLocation} from "react-router-dom"
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {UserContext} from '../State/UserContext'
import Cookies from 'js-cookie'
import {properties} from '../Properties/Properties'
import logo from '../team.png'
import NavFriendsDropdown from './Forms/NavFriendsDropdown'
import * as SockJS from 'sockjs-client'
import Stomp from 'stompjs'

export default function Nav(props){

    const [user, setUser] = useContext(UserContext)
    const [requests, setRequests] = useState([])
    const history = useHistory();
    const location = useLocation();


    useEffect(() => {
        setUser(Cookies.get('nickname'))
        console.log("user:", user)
        getFriendRequests()
    }, [])

    useEffect(() => {

        let stompClient = null
        if(user!==undefined && user!=='*()failed'){
            console.log("connecting socket")
            stompClient = Stomp.over(new SockJS('http://localhost:8080/sockets'))
            stompClient.connect({}, function (frame) {
                console.log("connected ", frame);
                stompClient.subscribe('/user/queue/friendRequests', function (notification) {
                   if(notification.body==="Friend request"){
                       getFriendRequests()
                   }
                });
            }, function(message){
            console.log("Notifications disconnected:",message)
            });

            return() => {
                if (stompClient !== null) {
                    stompClient.disconnect();
                }
            }
        }
    }, [user])


    //Runs on successful Login with Google
    ////////////////////////////////////////////////////////////
    const login = (response) => {
        (async () => {
            const apiResponse  = await fetch(properties.oauthLoginUri, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                body: JSON.stringify({"authCode":response['code']})
            });
            if(apiResponse.status===200){
                //nickname cookie is added by backend if login was successful
                setUser(Cookies.get('nickname'))
                if(Cookies.get('nickname')==='*()unset'){
                    history.push("/chooseNickname")
                }else{
                    history.push("/")
                }
            }else{
                setUser("*()failed")
                history.push(location.pathname)
            }
        })();

    }

    //Runs on Google's "Logout" button click
    ///////////////////////////////////////////////////////////////
    const logOut = () => {
        if(Cookies.get('nickname')===undefined){
            setUser(undefined)
            history.push("/")
            history.push(location.pathname)
            return
        }
        (async () => {
            await fetch(properties.oauthLogoutUri, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Accept':'text/plain',
                    'Content-type':'text/plain'
                }
            });      
        })()
        setUser(undefined)
        history.push("/")
        history.push(location.pathname)
    }

    const getFriendRequests = () => {
        if(Cookies.get('nickname')!==undefined && Cookies.get('nickname')!=='*()failed'){
            console.log(Cookies.get('nickname'), ">>> GETTING FRIENDS <<<");
            (async () => {
                await fetch(properties.getIncomingRequestsUri, {
                    credentials: 'include',
                    method: 'GET',
                    headers: {
                        'Accept':'application/json'
                    }
                }).then(response => {
                    return response.json()
                }).then(data => {
                    setRequests(data)
                })
            })()
        }
    }

    const declineFriendRequest = (request) => {
        (async () => {

            await fetch(properties.removeFriendUri , {
                credentials: 'include',
                method: 'DELETE',
                headers: {
                    'Content-type':'text/plain'
                },
                body: request
            }).then(response => {
                getFriendRequests()
               if(response.status === 200 && location.pathname==='/friends'){
                    history.push("/");
                    history.push("/friends")
               }
            })
        })();
    }

    const acceptFriendRequest = (request) => {
        (async () => {
            await fetch(properties.acceptFriendRequestUri , {
                credentials: 'include',
                method: 'PATCH',
                headers: {
                    'Content-type':'text/plain'
                },
                body: request
            }).then(response => {
               getFriendRequests() 
               if(response.status === 200 && location.pathname==='/friends'){
                    history.push("/");
                    history.push("/friends")
               }
            })
        })();
    }

    return(
        
        <nav className="navbar sticky-top navbar-expand navbar-dark bg-dark">
            <div className="container" id="navbar-container">
                <Link to="/" >
                    <img id="nav-logo" src={logo} alt="logo"/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <Link to="/"  >
                        <li className="nav-item active">
                            <span className="nav-link" href="/">Home <span className="sr-only">(current)</span></span>
                        </li>
                        </Link>
                        <Link to="/" >
                        <li className="nav-item active">
                            <span className="nav-link" href="/">Home <span className="sr-only">(current)</span></span>
                        </li>
                        </Link>
                        <Link to="/friends" >
                        <li className="nav-item active">
                            <span className="nav-link" >Friends <span className="sr-only">(current)</span></span>
                        </li>
                        </Link>
                        <Link to="/games" >
                        <li className="nav-item active">
                            <span className="nav-link">Games <span className="sr-only">(current)</span></span>
                        </li>
                        </Link>
                    </ul>
                    {user!==undefined && user!=='*()failed' && user!=='*()unset' ?
                        <div id="nickname-requests"> 
                            <NavFriendsDropdown acceptRequestFunction={acceptFriendRequest} getRequests={getFriendRequests}
                            declineRequestFunction={declineFriendRequest} requestList={requests}/>

                            <Link to="/chooseNickname"><div id="nickname">{user}</div></Link>
                        </div>
                    :
                    <div>&nbsp;</div>}

                    {user===undefined || user==='*()failed' ?
                        <GoogleLogin
                            clientId={properties.clientId}//add your google cliend ID to Properties/Properties.js
                            scope="profile email openid"
                            accessType="offline"
                            prompt="consent"
                            uxMode="redirect"
                            redirectUri={properties.backendAddress}
                            responseType="code"
                            buttonText="Log-in"
                            onSuccess={login}
                            onFailure={login}
                            cookiePolicy={'single_host_origin'}
                        />
                    :
                        <GoogleLogout
                            clientId={properties.clientId}
                            buttonText="Log-out"
                            onLogoutSuccess={logOut}
                        />
                    }
                </div>
             </div> 
        </nav>
    );

}