import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../State/UserContext'
import Cookies from 'js-cookie'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {properties} from '../Properties/Properties'
import ModalConfirmationDialog from './Utils/ModalConfirmationDialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faPlus, faTimesCircle} from '@fortawesome/free-solid-svg-icons'


export default function Games() {

    const [games, setGames] = useState([])
    const [user, setUser] = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()

    const ownerBackground ={
        background: "rgb(169, 192, 124)"
    }
    const guestBackground = {
        background: "rgb(124, 170, 192)"
    }

    useEffect(() => {
        setUser(Cookies.get('nickname'));
        if(Cookies.get('nickname')!==undefined && Cookies.get('nickname')!=="*()unset"){
            fetch(properties.getMyGamesUri, {
                credentials: 'include',
                method: 'GET',
                headers:{
                    'Accept':'application/json'
                }
            }).then(response => {
                return response.json();
            }).then( data => {
                setGames(data)
            })
        }
    }, [setUser])
    
    const deleteGame = (gameId) => {
        fetch(properties.deleteGameUri+gameId, {
            credentials: 'include',
            method: 'DELETE',
        }).then(response => {
            history.push("/")
            history.push(location.pathname)
        })
    }

    const leaveGame = (nicknameAndGameId) => {
        fetch(properties.removeGameMember+nicknameAndGameId[1], {
            credentials: 'include',
            method: 'DELETE',
            body: nicknameAndGameId[0]
        }).then(response => {
            history.push("/")
            history.push(location.pathname)
        })
    }

    return(
        <div id="card-container" className="card-deck">

            <div className="col-12 ml-1 sub-bar">
            <Link to="/createPlan">
                <button id="add-button">
                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                </button>
            </Link>
            <h1 className="regular-text">Plans</h1>
            </div>
            {games.map(game => (
                <div className="col-sm-12 col-md-6 col-lg-4 mt-2 mb-4" key={game.id}>
                    <div className="card" style={game.authorNickname === user ? ownerBackground : guestBackground}>
                        <div className="card-body mb-0 p-0">
                            {game.authorNickname === user ?
                                <React.Fragment>
                                    <ModalConfirmationDialog functionArgument={game.id} functionToExecute={deleteGame} 
                                    actionPrefix="game" warningText="Deleting: " warningArgument={game.title}/>
                                    <button id="delete-game" data-toggle="modal" data-target={"#modalPopupIdgame"+game.id}>
                                        <FontAwesomeIcon icon={faTimesCircle}/>
                                    </button>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <ModalConfirmationDialog functionArgument={[user, game.id]} 
                                    functionToExecute={leaveGame} actionPrefix="leaveGame" warningText="Leaving plan: " 
                                    warningArgument={game.title}/>
                                    <button id="delete-game" data-toggle="modal" data-target={"#modalPopupIdleaveGame"+user+game.id}>
                                    <FontAwesomeIcon icon={faTimesCircle}/>
                                    </button>
                                </React.Fragment>
                            }
                            
                            <h5 className="card-title h5 pl-3 pr-4">{game.title}</h5>
                        </div>
                        <hr className="mb-0 mt-0"/>
                        <h6 className="ml-3">By: {game.authorNickname}</h6>
                        <div className="card-footer pl-3">
                            <small className="text-muted">Created: {new Date(game.creationDateTime).toLocaleString("en-GB")+
                            " GMT+"+new Date().getTimezoneOffset()/-60} 
                            </small>
                            <Link to={"/game/"+game.id}>
                            <button id="game-details">
                                <FontAwesomeIcon icon={faInfoCircle}/>
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}