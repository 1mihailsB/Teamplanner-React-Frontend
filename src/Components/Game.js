import React,{useState, useEffect, useContext} from 'react'
import {UserContext} from '../State/UserContext'
import Cookies from 'js-cookie'
import {properties} from '../Properties/Properties'
import {Link, useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit} from '@fortawesome/free-solid-svg-icons'
import Status from './Forms/formUtils/Status'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import ModalConfirmationDialog from './Utils/ModalConfirmationDialog'
import AddGameMember from './Forms/AddGameMember'

export default function Game(props){

    const [game, setGame] = useState({})
    const [gameMembers, setGameMembers] = useState([])
    const [user, setUser] = useContext(UserContext)
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    const history = useHistory()
    const match = props.match

    const isAuthor = game.authorNickname === Cookies.get('nickname')
    
    const ownerBackground ={
        background: "rgb(169, 192, 124)"
    }
    const guestBackground = {
        background: "rgb(129, 172, 179)"
    }
    const guestMemberBackground = {
        background: "rgb(161, 192, 196)"
    }

    let rangeArray = new Array(200).fill("x")

    useEffect(() => {

        const gameId = [match['params']['id']];
        setUser(Cookies.get('nickname'));
        if(Cookies.get('nickname')!==undefined && Cookies.get('nickname')!=="*()unset"){
            fetch(properties.getGameByIdUri+gameId, {
                credentials: 'include',
                method: 'GET',
                headers:{
                    'Accept':'application/json'
                }
            }).then(response => {
                if(response.status===403){
                    setGame('You are not in this game');
                    return "403";
                }
                return response.json();
            }).then( data => {
                if(data.toString()!=="403"){
                    setGame(data)
                    setGameMembers(data.members)
                    setIsDataLoaded(true)
                }
            })
        }
    }, [setUser, match])

    const deleteGame = (gameId) => {
        fetch(properties.deleteGameUri+gameId, {
            credentials: 'include',
            method: 'DELETE'
        }).then(response => {
            history.push("/games")
        })
    }

    const removeGameMember = (nicknameAndGameId) => {
        console.log(nicknameAndGameId[1])
        fetch(properties.removeGameMember+nicknameAndGameId[1], {
            credentials: 'include',
            method: 'DELETE',
            body: nicknameAndGameId[0]
        }).then(response => {
            history.push("/game/"+nicknameAndGameId[1])
        })
    }
  
    const leaveGame = (nicknameAndGameId) => {
        console.log(nicknameAndGameId[1])
        fetch(properties.removeGameMember+nicknameAndGameId[1], {
            credentials: 'include',
            method: 'DELETE',
            body: nicknameAndGameId[0]
        }).then(response => {
            history.push("/games")
        })
    }

    return(
        
            <div className="col-12 mt-2 mb-4" >
                {isDataLoaded ?
                    <React.Fragment>
                        {game.toString() === 'You are not in this game' ? 
                            <Status statusProp={game.toString()} />
                        :
                            <React.Fragment>
                                {isAuthor ?
                                <div className="col-12">
                                <Link to={"/editPlan/"+game.id} >
                                    <button id="edit-button">
                                        <FontAwesomeIcon icon={faEdit} size="2x"/>
                                    </button>
                                </Link>
                                </div>
                                :
                                null
                                }
                                <div className="card mt-2" style={isAuthor ? ownerBackground : guestBackground} >
                                    <div className="card-body mb-0 p-0">
                                        {isAuthor ?
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
                                    {isAuthor ?
                                        <AddGameMember gameId={[match['params']['id']]} />
                                    :
                                    null
                                    }
                                    <h5 className="pl-4 pr-1">Members:</h5>

                                    <div className="plan-members pl-2 mt-1 ml-1" id={!isAuthor ? "guest-plan-members" : null}>
                                        
                                        {gameMembers.map(member => (
                                            <div className="game-member border rounded-lg border-secondary mr-1 pr-1 pl-1 pb-1 mb-1 h6"
                                            key={"member"+member} style={isAuthor ? ownerBackground : guestMemberBackground}>
                                                <div >{member}</div>
                                                {isAuthor ?
                                                    <React.Fragment>
                                                        <ModalConfirmationDialog actionPrefix="gameMember" functionArgument={[member,game.id]} 
                                                        functionToExecute={removeGameMember} warningText="Removing: " warningArgument={member}/>
                                                        <button className="pl-1" id="remove-gamemember" data-toggle="modal" 
                                                            data-target={"#modalPopupIdgameMember"+member+game.id}>
                                                            <FontAwesomeIcon icon={faTimesCircle}/>
                                                        </button>
                                                    </React.Fragment>
                                                    :
                                                    null
                                                }
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <hr className="mb-0 mt-1 mb-1" id="main-text-dividor"/>
                                    <pre className="ml-3 mainText">{game.mainText}</pre>
                                    <hr className="mb-0 mt-0"/>
                                    <h6 className="ml-3">By: {game.authorNickname}</h6>
                                    <div className="card-footer">
                                        <small className="text-muted">Created: {new Date(game.creationDateTime).toLocaleString("en-GB")+
                                        " GMT+"+new Date().getTimezoneOffset()/-60} 
                                        </small>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                    </React.Fragment>
                    :
                    null
                }
            </div>
           
        
    )
}