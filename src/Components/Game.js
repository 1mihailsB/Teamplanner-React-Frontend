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
    const [, setUser] = useContext(UserContext)
    const history = useHistory()
    const match = props.match

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
            console.log("response")
            history.push("/game/"+nicknameAndGameId[1])
        })
    }
  

    return(
        <div className="col-12 mt-2 mb-4" >
            {game.toString() === 'You are not in this game' ? 
                <Status statusProp={game.toString()} />
            :
                <React.Fragment>
                    <div className="col-12">
                    <Link to={"/editPlan/"+game.id} >
                        <button id="edit-button">
                            <FontAwesomeIcon icon={faEdit} size="2x"/>
                        </button>
                    </Link>
                    </div>

                    <div className="card mt-2">
                        <div className="card-body mb-0 p-0">
                            <ModalConfirmationDialog actionPrefix="game" functionArgument={game.id} 
                            functionToExecute={deleteGame} warningText="Deleting: " warningArgument={game.title}/>
                            <button id="delete-game" data-toggle="modal" data-target={"#modalPopupIdgame"+game.id}>
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            </button>
                            <h5 className="card-title h5 pl-3 pr-4">{game.title}</h5>
                        </div>

                        <hr className="mb-0 mt-0"/>
                        
                        <AddGameMember gameId={[match['params']['id']]} />
                        <h5 className="pl-4 pr-1">Members:</h5>

                        <div className="plan-members pl-2 mt-1 ml-1">
                            
                            {gameMembers.map(member => (
                                <div className="game-member border rounded-lg border-secondary mr-1 pr-1 pl-1 pb-1 mb-1 h6"
                                key={"member"+member}>
                                    <ModalConfirmationDialog actionPrefix="gameMember" functionArgument={[member,game.id]} 
                                    functionToExecute={removeGameMember} warningText="Removing: " warningArgument={member}/>
                                    <div>{member}</div>
                                    <button className="pl-1" id="remove-gamemember" data-toggle="modal" 
                                        data-target={"#modalPopupIdgameMember"+member+game.id}>
                                        <FontAwesomeIcon icon={faTimesCircle}/>
                                    </button>
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
        </div>
    )
}