import React, {useContext, useEffect} from "react"
import {Route, Redirect} from "react-router-dom"
import {UserContext} from '../State/UserContext'
import Cookies from 'js-cookie'
import ChooseNickname from './ChooseNickname/ChooseNickname'

export const ProtectedRoute = ({component: Component, ...rest}) =>{
    const [user, setUser] = useContext(UserContext)
    setUser(Cookies.get('nickname'))
    console.log("protected outside effect ", user, Cookies.get('nickname'))

    return(
        <Route {...rest}
            render={props => {
                if ((user!=='undefined' && user !== undefined) && user !== "*()failed" && user !=='*()unset'){
                    return <Component {...props} />;
                }else if(user===undefined || user==='undefined'){
                    return <Redirect to={
                        {
                            pathname: "/unauthorized",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }else if(user === '*()unset'){
                    
                    return <ChooseNickname {...props} />;
                }else{
                    return(<h2>Login error, please try again</h2>)
                }
            }}/>
    )
}