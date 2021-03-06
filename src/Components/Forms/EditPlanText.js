import React, {useState, useContext, useEffect} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import MyError from './formUtils/MyError'
import Status from './formUtils/Status'
import {useHistory, useParams} from 'react-router-dom'
import {properties} from '../../Properties/Properties'
import Cookies from 'js-cookie'
import {UserContext} from '../../State/UserContext'


const ValidationSchema = Yup.object().shape({
    mainTextField: Yup.string().max(3000, "Maximum length: 3000")
    .required("Minimum length: 1")
    .matches("^[a-zA-Z0-9 ,:;'/!.\n\\[\\]!@_-]{1,3000}$", "Only A-Z, a-z, 0-9, []!@_- characters are allowed")
});

export default function EditPlanText({match}){

    const[, setUser] = useContext(UserContext)
    const history = useHistory()
    const {id} = useParams()
    const [gameDetails, setGameDetails] = useState('')

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
                    setGameDetails('You are not in this game');
                    return "403";
                }
                return response.json();
            }).then( data => {
                if(data.toString()!=="403"){
                    setGameDetails(data.mainText)
                }
            })
        }
    }, [match, setUser])

    return(
        
        <Formik
            enableReinitialize={true}
            initialValues={{mainTextField: gameDetails}}
            validationSchema={ValidationSchema}
            onSubmit={(values, {setSubmitting, setStatus}) =>{
                setSubmitting(true);
                
                fetch(properties.editGameUri+id, {
                        credentials: 'include',
                        method: 'PATCH',
                        headers: {
                            'Accept':'text/plain',
                            'Content-type':'application/json'
                        },
                        body: JSON.stringify({"mainText":values.mainTextField})
                    }).then(response => {//if user timed out - response status will not be 200
                        if(response.status!==200){//then update user cotnext to update all components
                            setUser(Cookies.get('nickname'))
                        }
                        return response.text()})
                    .then(answer => {
                        setStatus(answer);
                        if(answer === "Game plan edited"){history.push("/game/"+id)}
                    });
                setSubmitting(false);
            }
        }
        >
            {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, status}) => (
                <form onSubmit={handleSubmit}>
                    <div className="form-group regular-text" id="planForm">
                        <h2 className="font-weight-bold">Edit details of your plan</h2>
                        <textarea type="text" rows="20"
                            className={touched.mainTextField
                                && errors.mainTextField? "form-control is-invalid mainText":"form-control mainText"}
                            name="mainTextField" id="mainTextField"
                            placeholder="Details, Maximum 3000 characters"

                            onChange={e => {
                                handleChange(e)
                            }}
                            onBlur={handleBlur}
                            value={values.mainTextField} />
                        {values.mainTextField.length}/3000
                        <MyError touched={touched.mainTextField} message={errors.mainTextField} />
                        <Status statusProp={status} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                </form>
            )

            }
        </Formik>
        
    )
}