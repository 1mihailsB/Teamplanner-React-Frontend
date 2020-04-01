import React,{useContext} from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import Error from './Error'
import {properties} from '../../Properties/Properties'
import {UserContext} from '../../State/UserContext'
import Cookies from 'js-cookie'

const ValidationSchema = Yup.object().shape({
    nicknameField: Yup.string().max(16, "Maximum length: 16")
    .required("Minimum length: 1")
    .matches("^[a-zA-Z0-9\\[\\]!@_-]{1,16}$", "Only A-Z, a-z, 0-9, []!@_- characters are allowed")
});

export default function ChooseNickname(){

    const [, setUser] = useContext(UserContext)
    
    return(
        
        <Formik 
        initialValues={{nicknameField:""}}
        validationSchema={ValidationSchema}
        onSubmit={(values, {setSubmitting, setStatus}) => {
            setSubmitting(true);
            console.log("representation:", values.nicknameField);
            (async () => {
                await fetch(properties.chooseNicknameUri, {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Accept':'text/plain',
                    'Content-type':'text/plain'
                },
                body: values.nicknameField
                }).then(response => response.text()).then(answer => {
                    setStatus(answer);
                    if(answer == "Nickname changed"){setUser(Cookies.get('nickname'))}
                });

                setSubmitting(false);
            })()
            
        }}
        >
            {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, status}) => (
                
                <form onSubmit={handleSubmit}>    
                <div className="form-group">
                    <h2 className="font-weight-bold text-dark">Set your nickname</h2>
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
                    <Error touched={touched.nicknameField} message={errors.nicknameField} />
                    {<h1>{status}</h1>}  
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                </form> 
            )}
        </Formik>
    );
};