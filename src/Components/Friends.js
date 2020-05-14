import React, {useEffect, useState, useContext} from 'react'
import Cookies from 'js-cookie'
import {properties} from '../Properties/Properties'
import {UserContext} from '../State/UserContext'
import {Link, useHistory, useLocation} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import ModalConfirmationDialog from './Utils/ModalConfirmationDialog'

export default function Friends (){

    const [user, setUser] = useContext(UserContext)
    const [friends, setFriends] = useState([])
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        setUser(Cookies.get('nickname'));
        if(Cookies.get('nickname')!==undefined && Cookies.get('nickname')!=="*()unset"){
            fetch(properties.getMyFriendsUri, {
                credentials: 'include',
                method: 'GET',
                headers:{
                    'Accept':'application/json'
                }
            }).then(response => {
                return response.json();
            }).then( data => {
                setFriends(data)
            })
        }
    }, [user, setUser])

    const deleteFriend = (friend) =>{
        (async () => {
            await fetch(properties.removeFriendUri , {
                credentials: 'include',
                method: 'DELETE',
                headers: {
                    'Content-type':'text/plain'
                },
                body: friend
            }).then(response => {
               if(response.status === 200 && location.pathname==='/friends'){
                    history.push("/");
                    history.push("/friends")
               }
            })
        })();
    }

    
    return(
        <div id="card-container" className="card-deck">
            <div className="col-12 ml-1 sub-bar">
            <Link to="/addFriend">
                <button id="add-button">
                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                </button>
            </Link>
            <h1 className="regular-text">Friends</h1>
            </div>
            
            {friends.map(friend => (
                <div className="col-sm-12 col-md-6 col-lg-4 mt-2 mb-4" key={friend}>
                <div className="card">
                    <div className="card-body mb-0 p-0">
                        <ModalConfirmationDialog functionArgument={friend} functionToExecute={deleteFriend}
                        actionPrefix="deleteFriend" warningText="Removing friend: " warningArgument={friend}/>
                        <button id="delete-game" data-toggle="modal" data-target={"#modalPopupIddeleteFriend"+friend}>
                            <FontAwesomeIcon icon={faTimesCircle}/>
                        </button>
                        <h5 className="card-title h5 pl-3 pr-4">{friend}</h5>
                    </div>
                   
                </div>
            </div>
            ))}
        </div>
    )

}