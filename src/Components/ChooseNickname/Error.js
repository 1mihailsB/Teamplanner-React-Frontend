import React from 'react'

export default Error = ({touched, message}) => {
    if(!touched){
        return <div>&nbsp;</div>
    }
    
    return <div className="font-weight-bold text-danger">{message}</div>
    
}