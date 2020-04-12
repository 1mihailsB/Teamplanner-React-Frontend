import React, {useState, useContext} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Error from './formUtils/Error'
import Status from './formUtils/Status'
import {useHistory} from 'react-router-dom'
import {properties} from '../../Properties/Properties'
import Cookies from 'js-cookie'
import {UserContext} from '../../State/UserContext'


const ValidationSchema = Yup.object().shape({
    titleField: Yup.string().max(50, "Maximum length: 50")
    .required("Minimum length: 1")
    .matches("^[a-zA-Z0-9 ,:\\[\\]!@_-]{1,50}$", "Only A-Z, a-z, 0-9, []!@_- characters are allowed"),
    mainTextField: Yup.string().max(3000, "Maximum length: 3000")
    .required("Minimum length: 1")
    .matches("^[a-zA-Z0-9 ,:;'/!.\n\\[\\]!@_-]{1,3000}$", "Only A-Z, a-z, 0-9, []!@_- characters are allowed")
});

export default function CreatePlan(){

    const[, setUser] = useContext(UserContext)
    const [inputLength, setInputLength] = useState(0)
    const history = useHistory()
    

    return(
        <Formik
            initialValues={{titleField:"", mainTextField:""}}
            validationSchema={ValidationSchema}
            onSubmit={(values, {setSubmitting, setStatus}) =>{
                setSubmitting(true);
                
                fetch(properties.createGameUri, {
                        credentials: 'include',
                        method: 'PUT',
                        headers: {
                            'Accept':'text/plain',
                            'Content-type':'application/json'
                        },
                        body: JSON.stringify({"title":values.titleField, 
                                              "mainText":values.mainTextField})
                    }).then(response => {//if user timed out - response status will not be 200
                        if(response.status!==200){//then update user cotnext to update all components
                            setUser(Cookies.get('nickname'))
                        }
                        return response.text()})
                    .then(answer => {
                        console.log(answer);
                        setStatus(answer);
                        if(answer === "Game plan created"){history.push("/games")}
                    });
                    setSubmitting(false);

            }
        }
        >
            {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, status}) => (
                <form onSubmit={handleSubmit}>
                    <div className="form-group regular-text" id="planForm">
                        <h2 className="font-weight-bold">Create a game plan</h2>
                        <input type="text" 
                            className={touched.titleField
                                && errors.titleField? "form-control is-invalid":"form-control"}
                            name="titleField" id="titleFIeld"
                            placeholder="Title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.titleField} />
                        <Error touched={touched.titleField} message={errors.titleField} />
                        <br/>
                        <textarea type="text" rows="20"
                            className={touched.mainTextField
                                && errors.mainTextField? "form-control is-invalid":"form-control"}
                            name="mainTextField" id="mainTextField"
                            placeholder="Details, Maximum 3000 characters"
                            onChange={e => {
                                handleChange(e)
                                setInputLength(document.getElementById('mainTextField').value.length)
                            }}
                            onBlur={handleBlur}
                            value={values.mainTextField} />
                            {inputLength}/3000
                        <Error touched={touched.mainTextField} message={errors.mainTextField} />
                        <Status statusProp={status} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                </form>
            )

            }
        </Formik>
        
    )
}