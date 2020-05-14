import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends,faTimesCircle, faCheckCircle, faExclamationCircle, faBell} from '@fortawesome/free-solid-svg-icons'

export default function NavGameinvitesDropdown(props){

    const declineRequest = props.declineGameInviteFunction
    const acceptRequest = props.acceptRequestFunction
    const gameInvites = props.gameInvites


    return(
        <div className="btn-group dropleft">
            <button type="button" id="friends-icon" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" >
                <FontAwesomeIcon size="2x" icon={faBell} />
                {gameInvites.length === 0 ? null :
                <i id="game-notification"><FontAwesomeIcon size="1x" icon={faExclamationCircle}/></i>}
            </button>
            <div className="dropdown-menu mt-5 pl-1 dropdown-outer" id="gamesDropdown">
                <h6 className="regular-text text-dark">Incoming game invites</h6>
                <hr className="mb-0 mt-0 pb-2"/>
                <div className="requests-container">
                {gameInvites.map(authorAndTitle => ( 
                    <div key={authorAndTitle[0]+authorAndTitle[1]}>
                        <div className="friend-request sub-bar" >
                            <div className="border rounded-lg border-secondary inner dropdown-inner pr-1 pl-1 pb-1 mb-1 h6" 
                                id="dropdown-nicknames"> {authorAndTitle[0]}
                            </div>
                            <h6 className="pl-1">invites you to:</h6> 
                            <button id="decline-friendrequest" onClick={() => declineRequest(authorAndTitle[2])}>
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            </button>
                            <button id="accept-friendrequest" onClick={() => acceptRequest(authorAndTitle[2])}>
                                <FontAwesomeIcon icon={faCheckCircle}/>
                            </button>
                        </div>
                        <div>
                            <h5>{authorAndTitle[1]}</h5>
                        </div>
                        <hr className="mb-0 mt-0 pb-2"/>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
} 