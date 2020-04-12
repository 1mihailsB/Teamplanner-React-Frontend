import React from 'react'

const nicknameErrors = ["Can't choose same nickname", "Nickname taken",
                        "Error, user doesn't exist", "Incorrect nickname"]
const gameplanErrors = ["Game plan with this title already exists"]

export default function Status(props) {
 
    if(props.statusProp === "Nickname changed" || props.statusProp === "Game plan created"){
        return <h4 className="text-success">{props.statusProp}</h4>
    }else if(nicknameErrors.includes(props.statusProp) || 
             gameplanErrors.includes(props.statusProp)){
        
            return <h4 className="text-danger">{props.statusProp}</h4>
    }
    return <div className="empty-sizeless-div">&nbsp;</div>
}