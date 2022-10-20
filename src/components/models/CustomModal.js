import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { PushNotify } from "..";

function CustomModal(props) {
      
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="modal-height"
      centered
    >
      <Modal.Header closeButton onClick={props.onHide}>
      <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {props.modalheader}
       {props.modalbody}
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;