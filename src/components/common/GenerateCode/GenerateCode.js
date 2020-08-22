import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import style from "./GenerateCode.module.css";
import sparkLogo from "../../../images/spark_app_logo_transparent.png";
import axios from "axios";
import Select from "react-select";
import Modal from "../Modal/Modal.js";
import notify from "../notify/notify.js";
import CodesGenerated from "../CodesGenerated/CodesGenerated";
function GenerateCode(props) {
  let [client, setClient] = useState([]);
  let [showGeneratedCodesModal, setShowGeneratedCodesModal] = useState(false);
  let [generatedCodes, setGeneratedCodes] = useState();
  let [form, setForm] = useState({
    communityDeck: 0,
    conversationalDeck: 0,
    spanishDeck: 0,
    youthDeck: 0,
    client: "",
    expirationDate: "",
  });

  let [formClient, setFormClient] = useState("");

  //Clears the forms whenever the user clicks on the modal
  const clearState = () => {
    setForm({
      ...form,
      communityDeck: 0,
      conversationalDeck: 0,
      spanishDeck: 0,
      youthDeck: 0,
      client: "",
      expirationDate: "",
    });

    setFormClient("");
  };

  //Sends a request to the server so we can display all the clients to the user
  useEffect(() => {
    const getClientData = async () => {
      const clientData = await axios.get(
        "https://api.spark4community.com/clients"
      );

      setClient(clientData.data);
    };
    getClientData();
    clearState();
  }, [props.showModal]);

  //Allows us to have controlled forms. Updates the state of the form as the user types
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //Updates the state of the select component as the user clicks on the options
  const handleSelectChange = (formClient) => {
    setFormClient(formClient);
  };

  //Prevents users from sending empty values in code_batches
  const formValidation = () => {
    if (
      ((formClient.length !== 0 || formClient.length !== 0) &&
        form.expirationDate.length !== 0 &&
        parseInt(form.communityDeck, 0) !== 0) ||
      parseInt(form.conversationalDeck, 0) !== 0 ||
      parseInt(form.spanishDeck, 0) !== 0 ||
      parseInt(form.youthDeck, 0) !== 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  //Sends the codeBatch data to the path /code_batch via post request
  const sendCodeData = async () => {
    if (
      formValidation() === true &&
      formClient.length !== 0 &&
      form.expirationDate.length
    ) {
      const codeBatch = {
        client_name: formClient.value,
        expiration_date: form.expirationDate,
        decks: {
          community: parseInt(form.communityDeck, 0),
          conversational: parseInt(form.conversationalDeck, 0),
          youth: parseInt(form.youthDeck, 0),
          spanish: parseInt(form.spanishDeck, 0),
        },
      };
      try {
        //Sends the data to /code_batch
        const data = await axios.post(
          "https://api.spark4community.com/code_batches",
          codeBatch
        );
        notify("Data has been sent!");
        //Stores the newly created codes in state to be displayed
        setGeneratedCodes(data.data.code_batch._id);
        //Updates the row with the new code_batch
        props.updateRows();
        //Closes the modal once they submt
        props.handleCloseModal();
        //Displays the newly generated codes to the user
        setShowGeneratedCodesModal(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      notify("Forms can't be empty!");
    }
  };

  //Sends the data to the server to be later displayed in the data grid for the user
  const handleSubmit = (events) => {
    //Prevents the page from refreshing after the form submission
    events.preventDefault();
    sendCodeData();
  };

  //Adds the new clients the user creates into the select component
  const selectOptions = () => {
    let newOptions = [];
    for (let i = 0; i < client.length; i++) {
      let currentClient = client[i];

      const options = {
        value: currentClient.name,
        label: currentClient.name,
      };

      newOptions.push(options);
    }
    return newOptions;
  };

  return (
    <div>
      <Modal
        overlayClick={true}
        height="60vh"
        color="#f3e8cb"
        showModal={props.showModal}
        handleCloseModal={props.handleCloseModal}
      >
        <div className={style.generateCodeContainer}>
          <div className={style.headerTextContainer}>
            <b className={style.headerText}>Create New Code(s)</b>
          </div>

          <div className={style.formContainer}>
            <form className={style.form} onSubmit={handleSubmit}>
              <div className={style.decks}>
                <div className={style.row}>
                  <label>Community Deck</label>
                  <input
                    name="communityDeck"
                    onChange={handleChange}
                    value={form.communityDeck}
                    type="number"
                    min="0"
                  />
                </div>
                <br />
                <div className={style.row}>
                  <label>Conversational Deck</label>
                  <input
                    name="conversationalDeck"
                    onChange={handleChange}
                    value={form.conversationalDeck}
                    type="number"
                    min="0"
                  />
                </div>
                <br />
                <div className={style.row}>
                  <label>Spanish Deck</label>
                  <input
                    name="spanishDeck"
                    onChange={handleChange}
                    value={form.spanishDeck}
                    type="number"
                    min="0"
                  />
                </div>
                <br />
                <div className={style.row}>
                  <label>Youth Deck</label>
                  <input
                    name="youthDeck"
                    onChange={handleChange}
                    value={form.youthDeck}
                    type="number"
                    min="0"
                  />
                </div>
              </div>
              <div className={style.clientContainer}>
                <div className={style.selectContainer}>
                  <div className={style.clientTextContainer}>
                    <label>Client</label>
                  </div>
                  <div className={style.selects}>
                    <Select
                      value={formClient}
                      isSearchable={true}
                      maxMenuHeight={190}
                      className={style.select}
                      onChange={handleSelectChange}
                      placeholder="Choose a client"
                      options={selectOptions()}
                    />
                  </div>
                </div>
                <div className={style.expDateContainer}>
                  <div className={style.expDateText}>
                    <label>Exp.Date</label>
                  </div>
                  <input
                    name="expirationDate"
                    onChange={handleChange}
                    value={form.expirationDate}
                    type="date"
                  />
                </div>
              </div>
              <div className={style.buttonContainer}>
                <button className={style.button} type="submit">
                  Generate Code(s)
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <CodesGenerated
        showModal={showGeneratedCodesModal}
        handleCloseModal={() => {
          setShowGeneratedCodesModal(false);
        }}
        generatedCodes={generatedCodes}
        openGenerateCode={props.openGenerateCode}
      />
    </div>
  );
}

export default GenerateCode;
