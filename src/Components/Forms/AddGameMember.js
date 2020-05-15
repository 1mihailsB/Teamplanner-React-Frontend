import React, {useState, useEffect, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery'
import {properties} from "../../Properties/Properties"
import Cookies from 'js-cookie'
import {UserContext} from '../../State/UserContext'


export default function AddGameMember(props){

    const [invitableFriends, setInvitableFriends] = useState([])
    const[, setUser] = useContext(UserContext)

    const getInvitableMembers = () => {
        const gameId = props.gameId;
        setUser(Cookies.get('nickname'));
        fetch(properties.getFriendsInvitableToGame+gameId, {
            credentials: 'include',
            method: 'GET',
            headers:{
                'Accept':'application/json'
            }
        }).then(response => {
            if(response.status===403){
                setInvitableFriends('Error');
                return "403";
            }
            return response.json();
        }).then( data => {
            if(data.toString()!=="403"){
                setInvitableFriends(data)
            }
        })
    }

    const addMember = (invitedNickname) => {
        setUser(Cookies.get('nickname'));
        fetch(properties.inviteFriendToGame+props.gameId, {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Accept':'text/plain',
                'Content-type':'text/plain'
            },
            body: invitedNickname
        }).then(response => {//if user timed out - response status will not be 200
            if(response.status!==200){//then update user cotnext to update all components
                setUser(Cookies.get('nickname'))
            }
            return response.text()})
        }

  

    $('.dropright').unbind().on('show.bs.dropdown', function () {
        getInvitableMembers()
    })
    
    useEffect(() => {
        getInvitableMembers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return(
        <div className="btn-group dropright" >
            <button type="button" id="add-member" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" >
                <FontAwesomeIcon size="1x" icon={faPlus} />
            </button>
            <div className="dropdown-menu mt-5 pl-1" id="addMemberDropdown" >
                <h6 className="regular-text text-dark">Add friend to plan</h6>
                <hr className="mb-0 mt-0 pb-2"/>
                <div className="requests-container">
                {invitableFriends.map(friend => (

                    <div className="friend-request sub-bar" key={friend}>
                        <div className="border rounded-lg border-secondary inner dropdown-inner pr-1 pl-1 pb-1 mb-1 h6" 
                            id="dropdown-nicknames"> {friend}
                        </div>

                        <button id="accept-friendrequest" onClick={() => addMember(friend)}>
                            <FontAwesomeIcon icon={faPlusCircle}/>
                        </button>
                        
                    </div>

                ))}
                </div>
            </div>
        </div>
    )
} 