import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends,faTimesCircle, faCheckCircle, faExclamationCircle} from '@fortawesome/free-solid-svg-icons'

export default function NavFriendsDropdown(props){

    const requestList = props.requestList
    const declineRequest = props.declineRequestFunction
    const acceptRequest = props.acceptRequestFunction

    return(
        <div className="btn-group dropleft">
            <button type="button" id="friends-icon" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" >
                <FontAwesomeIcon size="2x" icon={faUserFriends} />
                {requestList.length === 0 ? null :
                <i id="friend-notification"><FontAwesomeIcon size="1x" icon={faExclamationCircle}/></i>}
            </button>
            <div className="dropdown-menu mt-5 pl-1 dropdown-outer" id="friendsDropdown">
                <h6 className="regular-text text-dark">Incoming requests</h6>
                <hr className="mb-0 mt-0 pb-2"/>
                <div className="requests-container">
                {requestList.map(request => ( 
                    <div className="friend-request sub-bar" key={request}>
                        <div className="border rounded-lg border-secondary inner dropdown-inner pr-1 pl-1 pb-1 mb-1 h6" 
                            id="dropdown-nicknames"> {request}
                        </div>
                        <button id="decline-friendrequest" onClick={() => declineRequest(request)}>
                            <FontAwesomeIcon icon={faTimesCircle}/>
                        </button>
                        <button id="accept-friendrequest" onClick={() => acceptRequest(request)}>
                            <FontAwesomeIcon icon={faCheckCircle}/>
                        </button>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
} 