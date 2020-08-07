import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

function Modal(props) {
  const customStyle = {
    content: {
      top: "50%",
      left: "50%",
      width: "50vw",
      height: props.height,
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: props.color,
      borderRadius: "10px",
      fontFamily: "nunito sans"
    }
  };
  return (
    <div>
      <ReactModal
        isOpen={props.showModal}
        onRequestClose={props.handleCloseModal}
        style={customStyle}
        shouldCloseOnOverlayClick={props.overlayClick}
      >
        {props.children}
      </ReactModal>
    </div>
  );
}

export default Modal;
