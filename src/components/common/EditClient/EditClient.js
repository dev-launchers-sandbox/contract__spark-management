import React, { useState, useEffect } from "react";
import style from "./EditClient.module.css";
import Modal from "../Modal/Modal.js";
import axios from "axios";
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

  const getClientData = async () => {
    const clientData = await axios.get(
      "https://api.spark4community.com/clients"
    );
    setClient(clientData.data);
  };

  const getClientDataById = async () => {
    try {
      const response = await axios.get(
        `https://api.spark4community.com/clients/${props.clientToEdit}`
      );

      console.log("client data in edit client modal: ", response);
      /*
      setSpecificClientData({
        ...setSpecificClientData,
        clientName: response.data.client.name,
        logoUrl: response.data.client.logo_url
      })
      */
      setForm({
        ...form,
        client: response.data.client.name,
        logoUrl: response.data.client.logo_url,
      });
    } catch (err) {
      console.error("We got an error trying to get client by id", err);
    }
  };

  useEffect(() => {
    getClientData();
    getClientDataById();
    console.log(props.clientToEdit);
  }, [props.clientToEdit]);

  //it's called when users inputs data into the form
  const handleClientChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      client: value,
    });
    console.log("client value: ", form.client);
  };

  //it's called when users inputs data into the form
  const handleLogoUrlChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      logoUrl: value,
    });
    console.log("logo url: ", form.logoUrl);
  };

  //gets called when the user inputs the wrong username and password
  const notify = (text) => {
    toast(text, {
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

  const selectOptions = (data) => {
    let newOptions = [];
    for (let i = 0; i < data.length; i++) {
      let currentData = data[i];

      const options = {
        value: currentData.name,
        label: currentData.name,
      };

      newOptions.push(options);
    }
    return newOptions;
  };

  const handleSelectChange = (formClient) => {
    setFormClient(formClient);
    console.log("option selected: ", formClient);
  };

  const updateClientData = async () => {
    const clientData = {
      name: form.client,
      logo_url: form.logoUrl,
    };
    try {
      console.log("new client data: ", clientData);
      const response = await axios.put(
        `https://api.spark4community.com/clients/${props.clientToEdit}`,
        clientData
      );
      console.log("response data: ", response);
      notify("client has been updated!");
      props.handleCloseModal();
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
  const handleDeletion = () => {
    props.handleCloseModal();
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
