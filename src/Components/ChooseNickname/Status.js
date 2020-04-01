import React from 'react'

export default function Status(props) {
    console.log(props.statusProp,"status prop")
    console.log(props.statusProp==="Can't choose same nickname")
    if(props.statusProp === "Nickname changed"){
        return <h4 className="text-success">{props.statusProp}</h4>
    }else if(props.statusProp === "Can't choose same nickname" || props.statusProp === "Nickname taken"
        || props.statusProp === "Error, user doesn't exist" || props.statusProp === "Incorrect nickname"){
        
            return <h4 className="text-danger">{props.statusProp}</h4>
    }
    return <div>&nbsp;</div>
}