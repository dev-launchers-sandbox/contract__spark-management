import React, { useState, useEffect } from "react";
import Modal from "../../../../../../components/common/Modal/Modal.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import style from "./ClientCreatedModal.module.css";

function ClientCreatedModal(props) {
  //Automatically close the modal after 3 seconds.
  useEffect(() => {
    setTimeout(() => {
      props.handleCloseModal();
    }, 3000);
  }, [props.showModal]);

  return (
    <div className={style.ClientCreatedModal}>
      <Modal
        overlayClick={true}
        height="38vh"
        color="#f3e8cb"
        showModal={props.showModal}
        handleCloseModal={props.handleCloseModal}
      >
        <div className={style.confirmationTextHolder}>
          <h1>Client has been created!</h1>
        </div>
      </Modal>
    </div>
  );
}

export default ClientCreatedModal;
