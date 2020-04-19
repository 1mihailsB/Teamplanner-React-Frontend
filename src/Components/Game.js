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

export default function Game({match}){

    const [game, setGame] = useState({})
    const [, setUser] = useContext(UserContext)
    const history = useHistory()


    useEffect(() => {
        const gameId = [match['params']['id']];
        setUser(Cookies.get('nickname'));
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
                console.log(data)
                setGame(data)
            }
        })

    }, [setUser, match])

    const deleteGame = (gameId) => {
        fetch(properties.deleteGameUri+gameId, {
            credentials: 'include',
            method: 'DELETE',
        }).then(response => {
            history.push("/games")
        })
    }

    return(
        <div className="col-12 mt-2 mb-4" >
            {game.toString() === 'You are not in this game' ? 
                <Status statusProp={game.toString()} />
            :
                <React.Fragment>
                    <div className="col-12">
                    <Link to={{
                        pathname:"/editPlan/"+game.id, 
                        state: {mainText: game.mainText}
                        }} >
                        <button id="edit-button">
                            <FontAwesomeIcon icon={faEdit} size="2x"/>
                        </button>
                    </Link>
                    </div>

                    <div className="card mt-2">
                        <div className="card-body mb-0 p-0">
                            <ModalConfirmationDialog actionPrefix="game" functionArgument={game.id} 
                            functionToExecute={deleteGame} warningText="Deleting: " warningArgument={game.title}/>
                            <button id="delete-game" data-toggle="modal" data-target={"#modalPopupId"+"game"+game.id}>
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            </button>
                            <h5 className="card-title h5 pl-3 pr-4">{game.title}</h5>
                        </div>
                        <hr className="mb-0 mt-0"/>
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