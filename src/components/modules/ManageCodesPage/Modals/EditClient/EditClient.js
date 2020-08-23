import React, { useState, useEffect } from "react";
import style from "./EditClient.module.css";
import Modal from "../../../../../components/common/Modal/Modal.js";
import axios from "axios";
import notify from "../../../../../components/common/notify/notify.js";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";

function EditClient(props) {
  let [form, setForm] = useState({
    client: "",
    logoUrl: "",
  });
  let [formClient, setFormClient] = useState("");
  let [client, setClient] = useState([]);
  let [specificClientData, setSpecificClientData] = useState({
    clientName: "",
    logoUrl: "",
  });

  //sends a request to the server to display all available clients to the user
  const getClientData = async () => {
    const clientData = await axios.get(
      "https://api.spark4community.com/clients"
    );
    setClient(clientData.data);
  };

  //prepopulates the forms with the specific client data
  const getClientDataById = async () => {
    try {

      //makes request to server to get specific client data
      const response = await axios.get(
        `https://api.spark4community.com/clients/${props.clientToEdit}`
      );

      //prepopulates forms
      setForm({
        ...form,
        client: response.data.client.name,
        logoUrl: response.data.client.logo_url,
      });
    } catch (err) {
      console.error("We got an error trying to get client by id", err);
    }
  };

  //when client data changes it will remount
  useEffect(() => {
    getClientData();
    getClientDataById();
    console.log(props.clientToEdit);
  }, [props.clientToEdit]);

  //it updates state when user types something into the client form
  const handleClientChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      client: value,
    });
  };

  //it updates state when user types something into the logoUrl form
  const handleLogoUrlChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      logoUrl: value,
    });
  };

  //shows new client data that the user submitted
  const updateClientData = async () => {
    const clientData = {
      name: form.client,
      logo_url: form.logoUrl,
    };
    try {
      //updates the client data
      const response = await axios.put(
        `https://api.spark4community.com/clients/${props.clientToEdit}`,
        clientData
      );
      notify("The client has been updated!");
      //closes the modal
      props.handleCloseModal();
      //updates the row with the new client data
      props.updateRows();
    } catch (err) {
      console.error("got an error trying to update the client data: ", err);
      notify("You can't change it to a client that already exists!");
    }
  };


  const handleSubmit = (events) => {
    //prevents the page from reloading
    events.preventDefault();
    //updates the client Data
    updateClientData();
  };

  //will remove client and code associated with it from the row
  const handleDeletion = () => {
    //closes modal
    props.handleCloseModal();
    //deletes the client and all codes associated with it
    props.handleDelete("client", props.clientToEdit);
  };
  return (
    <div className={style.editClient}>
      <Modal
        overlayClick={true}
        height="60vh"
        color="#f3e8cb"
        showModal={props.showModal}
        handleCloseModal={props.handleCloseModal}
      >
        <div className={style.generateDistrict}>
          <div className={style.textContainer}>
            <b className={style.clientText}>Edit Client</b>
          </div>
          <form className={style.formContainer} onSubmit={handleSubmit}>
            <div className={style.clientContainer}>
              <label className={style.label}>Client Name</label>

              <input
                type="text"
                name="client"
                onChange={handleClientChange}
                value={form.client}
              />
            </div>
            <div className={style.logoUrlContainer}>
              <label className={style.label}>Logo URL</label>
              <input
                type="text"
                name="logoUrl"
                onChange={handleLogoUrlChange}
                value={form.logoUrl}
              />
            </div>
            <div className={style.buttonContainer}>
              <button className={style.button} type="submit">
                Edit Client
              </button>
              <button
                onClick={() => handleDeletion()}
                className={style.button}
                type="button"
              >
                Delete Client
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default EditClient;
