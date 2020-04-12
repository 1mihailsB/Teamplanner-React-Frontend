import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../State/UserContext'
import Cookies from 'js-cookie'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {properties} from '../Properties/Properties'


export default function Games() {

    const [games, setGames] = useState([])
    const [, setUser] = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()
    setUser(Cookies.get('nickname'))

    useEffect(() => {
        fetch(properties.getMyGamesUri, {
            credentials: 'include',
            method: 'GET',
            headers:{
                'Accept':'application/json'
            }
        }).then(response => {
            return response.json();
        }).then( data => {
            console.log(data)
            setGames(data)
        })
    }, [])
    
    const deleteGame = (gameId) => {
        fetch(properties.deleteGameUri+gameId, {
            credentials: 'include',
            method: 'DELETE',
        }).then(response => {
            console.log("deleting")
            history.push("/")
            history.push(location.pathname)
        })
    }

    return(
        <div id="card-container" className="card-deck">
            <div className="col-12 ml-1">
            <Link to="/createPlan">
                <button id="add-button">
                    <i className="fas fa-plus fa-2x" ></i>
                </button>
            </Link>
            </div>
            {games.map(game => (
                <div className="col-sm-12 col-md-6 col-lg-4 mt-2 mb-4" key={game.id}>
                    <div className="card ">
                        <div className="card-body mb-0 p-0">
                            <button id="delete-game" onClick={() => deleteGame(game.id)}>
                                <i className="fas fa-times-circle"></i>
                            </button>
                            <h5 className="card-title h5 pl-3 pr-4">{game.title}</h5>
                        </div>
                        <hr className="mb-0 mt-0"/>
                        <h6 className="ml-3">By: {game.authorNickname}</h6>
                        <div className="card-footer">
                            <small className="text-muted">Created: {new Date(game.creationDateTime).toLocaleString("en-GB")}</small>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}