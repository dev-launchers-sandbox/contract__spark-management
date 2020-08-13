import React, { useState, useEffect } from "react";
import style from "./GenerateClient.module.css";
import Modal from "../Modal/Modal.js";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";

function GenerateClient(props) {
  let [form, setForm] = useState({
    client: "",
    logoUrl: ""
  });
  //it's called when users inputs data into the form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  //gets called when the user inputs the wrong username and password
  const notify = (text) => {
    toast(text, {
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

  //sends the clienData to the path /clients via post request
  const sendClientData = async () => {
    if (form.client.length !== 0 && form.logoUrl.length !== 0) {
      const clientData = {
        name: form.client,
        logo_url: form.logoUrl
      };
      console.log("client length: ", form.client.length);
      console.log("logo url length: ", form.logoUrl.length);
      try {

        const response = await axios.post("http://192.232.212.61:8080/clients", clientData);
        notify("Data has been sent!");

        /*
        const userResponse = await axios.get("http://192.232.212.61:8080/users/current");
        console.log("current user: ", userResponse)
        */

      console.log("client data: ", response);
      } catch (err) {
        console.error(err);
      }
    } else {
      notify("Forms can't be empty!");
      console.log("form is empty");
    }
  };

  //gets called when the user clicks the Generate Client button
  const handleSubmit = (events) => {
    //prevents the page from reloading on submit
    events.preventDefault();

    sendClientData();
  };

  return (
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
            <button className={style.button} onClick={handleSubmit}>
              Create Client
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default GenerateClient;
