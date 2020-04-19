import React from 'react'

export default function MyError  ({touched, message}) {
    if(!touched){
        return <div className="empty-sizeless-div">&nbsp;</div>
    }
    
    return <div className="font-weight-bold text-danger">{message}</div>
    
}