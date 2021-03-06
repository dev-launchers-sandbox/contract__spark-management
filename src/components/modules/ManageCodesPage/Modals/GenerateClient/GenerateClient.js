import React, { useState, useEffect } from "react";
import style from "./GenerateClient.module.css";
import Modal from "../../../../../components/common/Modal/Modal.js";
import ClientCreatedModal from "./ClientCreatedModal/ClientCreatedModal.js";
import notify from "../../../../../utils/notify.js";
import axios from "axios";
import Select from "react-select";
import Button from "../../../../../components/common/Button/Button";
function GenerateClient(props) {
  let [form, setForm] = useState({
    client: "",
    logoUrl: "",
  });

  let [showClientCreatedModal, setShowClientCreatedModal] = useState(false);

  //Allows us to have controlled forms. Updates the state of the form as the user types
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //Clears the forms whenever the user clicks on the modal
  const clearState = () => {
    setForm({
      ...form,
      client: "",
      logoUrl: "",
    });
  };

  //When the user opens the modal the forms will be cleared
  useEffect(() => {
    clearState();
  }, [props.showModal]);

  //sends the clienData to the path /clients via post request
  const sendClientData = async () => {
    if (form.client.length !== 0) {
      //Prevents the user from accidentally submitting no client
      const clientData = {
        name: form.client,
        logo_url: form.logoUrl,
      };
      try {
        //Sends a request to the server to later display the clients to the user
        const response = await axios.post(
          "https://api.spark4community.com/clients",
          clientData
        );
        notify("Data has been sent!");
        //Updates the row with the new code_batch
        props.handleCloseModal();
        //Displays a modal that tells the user their data has been sent
        setShowClientCreatedModal(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      notify("Client form can't be empty!");
    }
  };

  //Gets called whenever the form gets submitted
  const handleSubmit = (events) => {
    //Prevents the page from refreshing after the form submission
    events.preventDefault();
    sendClientData();
  };

  return (
    <div>
      <Modal
        overlayClick={true}
        height="58vh"
        color="#f3e8cb"
        showModal={props.showModal}
        handleCloseModal={props.handleCloseModal}
      >
        <div className={style.generateDistrict}>
          <div className={style.textContainer}>
            <b className={style.clientText}>Create New Client</b>
          </div>
          <form className={style.formContainer}>
            <div className={style.clientContainer}>
              <label className={style.label}>Client Name</label>
              <input
                type="text"
                name="client"
                onChange={handleChange}
                value={form.client}
                required
              />
            </div>
            <div className={style.logoUrlContainer}>
              <label className={style.label}>Logo URL</label>
              <input
                type="text"
                name="logoUrl"
                onChange={handleChange}
                value={form.logoUrl}
              />
            </div>
            <div className={style.buttonContainer}>
              <Button
                style={{ fontWeight: "bold", color: "black" }}
                onClick={handleSubmit}
              >
                {" "}
                Create Client{" "}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <ClientCreatedModal
        showModal={showClientCreatedModal}
        handleCloseModal={() => {
          setShowClientCreatedModal(false);
        }}
      />
    </div>
  );
}

export default GenerateClient;
/*
<button className={style.button} onClick={handleSubmit}>
  Create Client
</button>
*/
