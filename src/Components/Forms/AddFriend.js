import React,{useContext} from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import MyError from './formUtils/MyError'
import {properties} from '../../Properties/Properties'
import {UserContext} from '../../State/UserContext'
import Cookies from 'js-cookie'
import Status from './formUtils/Status'

const ValidationSchema = Yup.object().shape({
    nicknameField: Yup.string().max(16, "Maximum length: 16")
    .required("Minimum length: 1")
    .matches("^[a-zA-Z0-9\\[\\]!@_-]{1,16}$", "Only A-Z, a-z, 0-9, []!@_- characters are allowed")
});

export default function AddFriend(){

    const [, setUser] = useContext(UserContext)
    return(
 
        <Formik 
        initialValues={{nicknameField:""}}
        validationSchema={ValidationSchema}
        onSubmit={(values, {setSubmitting, setStatus}) => {
            setSubmitting(true);

            (async () => {
                await fetch(properties.inviteFriendUri, {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Accept':'text/plain',
                    'Content-type':'text/plain'
                },
                body: values.nicknameField
                }).then(response => {//if user timed out - response status will not be 200
                        if(response.status!==200){//then update user cotnext to update all components
                            setUser(Cookies.get('nickname'))
                        }
                        return response.text()})
                    .then(answer => {
                        setStatus(answer);
                        if(answer === "Nickname changed"){setUser(Cookies.get('nickname'))};
                    });
                setSubmitting(false);
            })()
        }}
        >
            {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, status}) => (
                
                <form onSubmit={handleSubmit}>    
                <div className="form-group regular-text" id="nicknameForm">
                    <h2 className="font-weight-bold">Invite a friend</h2>
                    <input type="text" 
                    className={touched.nicknameField
                        && errors.nicknameField? "form-control is-invalid":"form-control"}
                    name="nicknameField" 
                    id="nicknameField"
                    placeholder="nickname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nicknameField}
                    />
                    <MyError touched={touched.nicknameField} message={errors.nicknameField} />
                    <Status statusProp={status}/>  
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                </form> 
            )}
        </Formik>
    );
};