import React from 'react'

export default function ModalConfirmationDialog(props) {

    const functionArgument = props.functionArgument
    const functionToExecute = props.functionToExecute
    const warningArgument = props.warningArgument
    const actionPrefix = props.actionPrefix
    const warningText = props.warningText

    
    return(
        <div className="modal fade bd-example-modal-lg" id={"modalPopupId"+actionPrefix+functionArgument}
        tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content" name={"modal-"+warningArgument}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLongTitle">{warningText} {warningArgument}</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span> 
                        </button>
                    </div>
                    <div className="modal-body">
                        <h5>Are you sure ?</h5>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary"
                        onClick={() => functionToExecute(functionArgument)} data-dismiss="modal">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}