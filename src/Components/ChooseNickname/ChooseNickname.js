import React,{useState} from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import Error from './Error'
import {useHistory, useLocation} from 'react-router-dom'

const ValidationSchema = Yup.object().shape({
    nicknameField: Yup.string().max(16, "Maximum length: 16")
    .required("Minimum length: 1")
    .matches("^[a-zA-Z0-9\\[\\]!@_-]{1,16}$", "Only A-Z, a-z, 0-9, []!@_- characters are allowed")
});

export default function ChooseNickname(){
    const [nicknameTaken, setNicknameTaken] = useState(false)
    const history = useHistory();
    const location = useLocation();
    
    if(nicknameTaken=='Username changed'){history.push(location.pathname)}

    return(
        
        <Formik 
        initialValues={{nicknameField:""}}
        validationSchema={ValidationSchema}
        onSubmit={(values, {setSubmitting}) => {
            setSubmitting(true);
            (async () => {
                await fetch('http://localhost:8080/oauth/chooseNickname', {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Accept':'text/plain',
                    'Content-type':'text/plain'
                },
                body: values.nicknameField
                }).then(response => response.text()).then(answer => {
                    setNicknameTaken(answer)});

                setSubmitting(false)
        })()
        }}
        >
            {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                
                <form onSubmit={handleSubmit}>    
                <div className="form-group">
                    <h2 className="font-weight-bold text-dark">Set your nickname</h2>
                    <input type="text" 
                    className={touched.nicknameField && errors.nicknameField? "form-control is-invalid":"form-control"}
                    name="nicknameField" 
                    id="nicknameField"
                    placeholder="nickname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nicknameField}
                    />
                    {nicknameTaken == 'Username taken'? <h1 className="text-danger">Nickname Taken</h1> : <div>&nbsp;</div>}
                    <Error touched={touched.nicknameField} message={errors.nicknameField} />
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                </form> 
            )}
        </Formik>
    );
};