import React from 'react'

const nicknameErrors = ["Can't choose same nickname", "Nickname taken",
                        "Error, user doesn't exist", "Incorrect nickname"]
const gameplanErrors = ["Game plan with this title already exists", "You are not in this game"]
const friendRequestErrors = ["Request is pending","This person is already your friend","Can't invite yourself"]

export default function Status(props) {
 
    if(props.statusProp === "Nickname changed" || props.statusProp === "Game plan created" ||
       props.statusProp === "Friend request sent"){
        return <h4 className="text-success">{props.statusProp}</h4>
    }else if(nicknameErrors.includes(props.statusProp) || 
             gameplanErrors.includes(props.statusProp) || friendRequestErrors.includes(props.statusProp)){
        
            return <h4 className="text-danger">{props.statusProp}</h4>
    }
    return <div className="empty-sizeless-div">&nbsp;</div>
}