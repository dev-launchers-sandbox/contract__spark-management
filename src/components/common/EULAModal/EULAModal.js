import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import termsOfAgreement from "./termsOfAgreement.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import header from "../../../../";

import style from "./Modal.module.css";

toast.configure();
function EULAModal() {
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
    console.log(isLocalStorageAvailable());
    /*
    checks to see if the user has already accepted the terms.
    If not, display the eula modal
  */
    accepted = localStorage.getItem("accepted")
      ? JSON.parse(localStorage.getItem("accepted"))
      : true;
  } else {
    accepted = true;
    console.log(isLocalStorageAvailable());
  }
  const [showModal, setShowModal] = useState(accepted);
  const [answer, setIsChecked] = useState({
    isChecked: false
  });

  /*
    this checks if local storage is available (avoids crash in private mode)
    If it is, it will return true, if not, false.
  */

  //when the toggle button is clicked, the modal is shown
  const handleOpenModal = () => {
    //window.location.reload();

    setShowModal(true);
    //get the accepted value from localStorage
    let newAnswer = JSON.parse(localStorage.getItem("accepted"));
    //set the accepted value to true
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

  //notifies the user when the decline button is pressed
  const notify = event => {
    event.preventDefault();
    toast("You must accept to continue", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
      className: css({
        background: "white"
      }),
      bodyClassName: css({
        fontSize: "20px",
        color: "black"
      }),
      progressClassName: css({
        background: "repeating-radial-gradient( transparent, transparent )"
      })
    });
  };

  //updates state accordingly when users input things
  const handleChange = event => {
    const { name, checked } = event.target;

    setIsChecked({
      ...answer,
      [name]: checked
    });
    console.log(answer);
  };
  //custom styles for the modal
  const customStyle = {
    content: {
      top: "50%",
      left: "50%",
      width: "50vw",
      height: "73vh",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#961a1e",
      borderRadius: "10px"
    }
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
          <textarea
            className={style.modalTextArea}
            value={termsOfAgreement}
            readOnly
          />
          <br />
          <div className={style.container}>
            <div className={style.checkBox}>
              <input
                type="checkbox"
                onChange={handleChange}
                name="isChecked"
                checked={answer.isChecked}
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
      {/*if the user hasn't accepted the terms then it will display the modal.
        if the user did accept the the terms then it won't display the model
    */}
      {showModal ? eulaModal : ""}
    </div>
  );
}

export default EULAModal;
