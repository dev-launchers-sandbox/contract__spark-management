import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import termsOfAgreement from "./termsOfAgreement.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import TextBox from "../EULAModal/TextBox/TextBox.js";

import style from "./Modal.module.css";

toast.configure();
function EULAModal() {
  //Checks to see if localStorage is available, to avoid a later error.
  const isLocalStorageAvailable = () => {
    var test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  };
  let accepted;
  if (isLocalStorageAvailable()) {
    /*
    Checks to see if the user has already accepted the terms.
    If not, display the EULA Modal
  */
    accepted = localStorage.getItem("accepted")
      ? JSON.parse(localStorage.getItem("accepted"))
      : true;
  } else {
    accepted = true;
  }
  const [showModal, setShowModal] = useState(accepted);
  const [answer, setIsChecked] = useState({
    isChecked: false,
  });

  //when the toggle button is clicked, the modal is shown
  const handleOpenModal = () => {
    setShowModal(true);
    //Get the accepted value from localStorage
    let newAnswer = JSON.parse(localStorage.getItem("accepted"));
    //Set the accepted value to true
    newAnswer = true;
    //set the new answer into localStorage
    localStorage.setItem("accepted", JSON.stringify(newAnswer));
  };

  //when the accept button is clicked, the modal becomes hidden
  const handleCloseModal = () => {
    setShowModal(false);
    //get the accepted value from localStorage
    let newAnswer = JSON.parse(localStorage.getItem("accepted"));
    //set the accepted vaue to false
    newAnswer = false;
    //set the new answer into localStorage
    localStorage.setItem("accepted", JSON.stringify(newAnswer));
  };

  //Notifies the user when the decline button is pressed
  const notify = (event) => {
    event.preventDefault();
    toast("You must accept to continue", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
      className: css({
        background: "white",
      }),
      bodyClassName: css({
        fontSize: "20px",
        color: "black",
      }),
      progressClassName: css({
        background: "repeating-radial-gradient( transparent, transparent )",
      }),
    });
  };

  //Allows us to have controlled forms. Updates the state of the form as the user types
  const handleChange = (event) => {
    const { name, checked } = event.target;

    setIsChecked({
      ...answer,
      [name]: checked,
    });
  };
  //Custom styles for the modal
  const customStyle = {
    content: {
      top: "50%",
      left: "50%",
      width: "50vw",
      height: "78vh",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#961a1e",
      borderRadius: "10px",
    },
  };

  const eulaModal = (
    <ReactModal
      isOpen={showModal}
      contentLabel="onRequestClose Example"
      onRequestClose={handleCloseModal}
      style={customStyle}
      shouldCloseOnOverlayClick={false}
    >
      <p className={style.modalText}>
        End User Licence Agreement | Terms of Service | Privacy Policy
      </p>
      <div className={style.formContainer}>
        <form>
          <div className={style.textBoxContainer}>
            <TextBox />
          </div>
          <br />
          <div className={style.container}>
            <div className={style.checkBox}>
              <input
                type="checkbox"
                onChange={handleChange}
                name="isChecked"
                checked={answer.isChecked}
                className={style.check}
              />

              <label>
                I agree to the{" "}
                <a
                  href="https://spark4community.com/terms-and-conditions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.link}
                >
                  Terms of Service
                </a>
                ,{" "}
                <a
                  href="https://spark4community.com/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.link}
                >
                  Privacy Policy
                </a>
                , and the{" "}
                <a
                  href="https://spark4community.com/s-p-a-r-k-app-end-user-license-agreement/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.link}
                >
                  EULA
                </a>
              </label>
            </div>
            <div className={style.buttonContainer}>
              <button onClick={notify} className={style.declineButton}>
                Decline
              </button>
              <button
                onClick={handleCloseModal}
                disabled={!answer.isChecked}
                className={style.acceptButton}
              >
                Accept
              </button>
            </div>
          </div>
        </form>
      </div>
    </ReactModal>
  );

  return (
    <div className={style.modalContainer}>
      {/*}<button onClick={handleOpenModal}>open</button>{*/}
      {/*if the user hasn't accepted the terms then it will display the modal.
        if the user did accept the the terms then it won't display the model
    */}
      {showModal ? eulaModal : ""}
    </div>
  );
}

export default EULAModal;
