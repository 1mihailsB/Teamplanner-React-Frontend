import React, {useState} from 'react'

export default function About() {

    const about = () => {
        (async () => { 
            const apiResponse  = await fetch('http://localhost:8080/about', {
                credentials: 'include',
                method: 'GET'
            });
            const apiResponseObject = await apiResponse.text()
            console.log(apiResponseObject)
        })()
    }
    
    return(
        <div>
            <h1 className="regular-text">About</h1>
            <button type="button" onClick={about} className="btn btn-info">JWT token. Use when logged in</button>
        </div>
    )
}