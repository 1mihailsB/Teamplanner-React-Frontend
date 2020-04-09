import React, {useContext} from "react"
import {Route, Redirect} from "react-router-dom"
import {UserContext} from '../State/UserContext'
import ChooseNickname from './ChooseNickname/ChooseNickname'

export const ProtectedRoute = ({component: Component, ...rest}) =>{
    const [user, ] = useContext(UserContext)

    return(
        <Route {...rest}
            render={props => {
                if (user !== undefined && user !== "*()failed" && user !=='*()unset'){
                    return <Component {...props} />;
                }else if(user===undefined){
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
                    return(<h2 className="regular-text">Login error, please try again</h2>)
                }
            }}/>
    )
}