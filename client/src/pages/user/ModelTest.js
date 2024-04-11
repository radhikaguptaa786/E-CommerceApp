import React from 'react'

const ModelTest = () => {
  return (
    <>
    <div>

<div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div className="modal-dialog">
   <div className="modal-content">
     <div className="modal-header">
       <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
     </div>
     <div className="modal-body">
       <form>
         <div className="mb-3">
           <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
           <input type="text" className="form-control" id="recipient-name" />
         </div>
         <div className="mb-3">
           <label htmlFor="message-text" className="col-form-label">Message:</label>
           <textarea className="form-control" id="message-text" defaultValue={""} />
         </div>
       </form>
     </div>
     <div className="modal-footer">
       <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       <button type="button" className="btn btn-primary">Send message</button>
     </div>
   </div>
 </div>
</div>
</div>

</>
  )
}

export default ModelTest
