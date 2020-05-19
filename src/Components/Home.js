import React from 'react'


export default function Home(){

    return(
        
        <div className="welcome">
            <h1 id="welcome">Welcome !</h1>
            <div className="welcome-description">
                <p>Log in and choose a nickname</p>
                <p>Create a plan for any needs you want</p>
                <ul>
                    <li>Meeting</li>
                    <li>Event</li>
                    <li>Game session with your friends</li>
                    <li>Just a reminder or a note for yourself</li>
                </ul>
                <p>Add your friends by the nickname they have chosen and invite them to your plans</p>
            </div>
        </div>
    )
}