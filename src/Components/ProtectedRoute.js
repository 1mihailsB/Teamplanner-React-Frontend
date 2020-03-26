import React, {useContext} from "react"
import {Route, Redirect} from "react-router-dom"
import {UserContext} from '../State/UserContext'
import Cookies from 'js-cookie'

export const ProtectedRoute = ({component: Component, ...rest}) =>{
    const [user, setUser] = useContext(UserContext)
    setUser(Cookies.get('user'))
    console.log("user: ", user)

    return(
        <Route {...rest}
            render={props => {
                if ((user!=='undefined' && user !== undefined) && user !== "#$%^failed"){
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
                }else{
                    return(<h2>Login error, please try again</h2>)
                }
            }}/>
    )
}