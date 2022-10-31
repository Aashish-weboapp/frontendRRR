import React, { useState } from "react";
import  '../../styles/components/Modal.css'

function Modal(props) {

  let modalDisplay = props.display == true ? 'block': 'none'

  let style={
    ...props.style
  }
      
  return (
    <div id="myModal" class="modal" style={{display:modalDisplay}}>
        <div class="modal-content" style={style}>
            <div class="modal-header">
              {props.modalheader}
            </div>
            <div class="modal-body">
              {props.modalbody}
            </div>
            <div class="modal-footer">
           
            </div>
        </div>
</div>
  );
}

export default Modal;