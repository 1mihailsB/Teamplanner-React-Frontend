import React, {useContext} from "react"
import {Route, Redirect} from "react-router-dom"
import {UserContext} from '../State/UserContext'
import Cookies from 'js-cookie'

export const ProtectedRoute = ({component: Component, ...rest}) =>{
    const {user, setUser} = useContext(UserContext)
    console.log("user: ", user)

    return(
        <Route {...rest}
            render={props => {
                if ((Cookies.get('user')!=='undefined' && Cookies.get('user') !== undefined) && Cookies.get('user') !== "#$%^failed"){
                    return <Component {...props} />;
                }else if(Cookies.get('user')===undefined || Cookies.get('user')==='undefined'){
                    return <Redirect to={
                        {
                            pathname: "/unauthorized",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }else{
                    return(<h2>Login error, please try again</h2>)
                }
            }}/>
    )
}