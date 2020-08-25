import React, { useState, useEffect } from "react";
import style from "./EditCodeModal.module.css";
import Modal from "../../../../../components/common/Modal/Modal.js";
import axios from "axios";
import Select from "react-select";
import notify from "../../../../../utils/notify.js";
import Button from "../../../../../components/common/Button/Button.js";
function EditCodeModal(props) {
  let [client, setClient] = useState([]);

  let [form, setForm] = useState({
    client: "",
    expirationDate: "",
    subClient: "",
    deckName: "",
  });

  let [formClient, setFormClient] = useState("");
  let [deckForm, setDeckForm] = useState("");

  let [deck, setDeck] = useState([]);

  let [hasChanged, setHasChanged] = useState(false);

  //makes a request to the server to later display the existing clients
  const getClientData = async () => {
    const clientData = await axios.get(
      "https://api.spark4community.com/clients"
    );

    setClient(clientData.data);
  };

  //makes a request to the server to later display the existing decks
  const getDeckData = async () => {
    const deckData = await axios.get("https://api.spark4community.com/decks");
    setDeck(deckData.data);
  };

  //prepopulates the forms with specific code data
  const getCodeData = async () => {
    const codeDataResponse = await axios.get(
      `https://api.spark4community.com/codes/${props.rowToEdit._id}`
    );

    setForm({
      ...form,
      client: codeDataResponse.data.code.client_name,
      expirationDate:
        codeDataResponse.data.code.expiration_date.substr(0, 10) || "00/00/00",
      subClient: codeDataResponse.data.code.sub_client_name || "",
      deckName: codeDataResponse.data.code.deck_name,
    });
    setDeckForm(codeDataResponse.data.code.deck_name);
    setFormClient(codeDataResponse.data.code.client_name);
  };

  //displays the client and deck data
  useEffect(() => {
    getClientData();
    getDeckData();
  }, []);

  //displays the prepopulated code data if it is not undefined
  useEffect(() => {
    if (!props.rowToEdit) return;
    getCodeData();
  }, [props.rowToEdit]);

  //updates state when the client select component is clicked
  const handleSelectChange = (formClient) => {
    setFormClient(formClient);
  };

  //updates state when the deck select component is clicked
  const handleDeckSelectChange = (deckForm) => {
    setDeckForm(deckForm);
  };
  //it updates state when the user types in something in subclient
  const handleSubClientChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      subClient: value,
    });
  };

  //it updates state when the user chooses something for the expiration date
  const handleExpirationDateChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      expirationDate: value,
    });
  };

  //sends the new updated code data the user submits
  const updateCodeData = async () => {
    const codeBatch = {
      deck_name: deckForm.value,
      client_name: formClient.value,
      expiration_date: form.expirationDate,
      sub_client_name: form.subClient,
    };
    try {
      //updates the code data
      const response = await axios.put(
        `https://api.spark4community.com/codes/${props.rowToEdit._id}`,
        codeBatch
      );

      notify("The code data has been updated!");
      //closes the modal
      props.handleCloseModal();
      //updates the row with the new code data
      props.updateRows();
    } catch (err) {
      console.error(err);
      notify("Something went wrong with sending the data");
    }
  };

  //will update code data when the edit code button is pressed
  const handleSubmit = (events) => {
    //prevents page from refreshing
    events.preventDefault();
    //updayes the code data
    updateCodeData();
  };

  //adds the new data the user creates into the select component
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

  return (
    <div className={style.editModal}>
      <Modal
        overlayClick={true}
        height="60vh"
        color="#f3e8cb"
        showModal={props.showModal}
        handleCloseModal={props.handleCloseModal}
      >
        <div className={style.editModal}>
          <div className={style.headerHolder}>
            <b>Edit Code/Client</b>
          </div>
          <div className={style.formContainer}>
            <form className={style.form} onSubmit={handleSubmit}>
              <div className={style.decks}>
                <div className={style.selectContainer}>
                  <label>Deck</label>
                  <div className={style.selectsDeck}>
                    <Select
                      value={deckForm}
                      isSearchable={true}
                      maxMenuHeight={190}
                      className={style.select}
                      onChange={handleDeckSelectChange}
                      options={selectOptions(deck)}
                      placeholder={form.deckName}
                    />
                  </div>
                </div>
                <br />
                <div className={style.row}>
                  <label>Sub Client</label>
                  <input
                    name="subClient"
                    onChange={handleSubClientChange}
                    className={style.subClientText}
                    value={form.subClient}
                    type="text"
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
                      options={selectOptions(client)}
                      placeholder={form.client}
                    />
                  </div>
                </div>
                <div className={style.expDateContainer}>
                  <div className={style.expDateText}>
                    <label>Exp.Date</label>
                  </div>
                  <input
                    type="date"
                    className={style.expirationDateText}
                    name="expirationDate"
                    onChange={handleExpirationDateChange}
                    value={form.expirationDate}
                  />
                </div>
              </div>
              <div className={style.buttonContainer}>
                <button className={style.button} type="submit">
                  Update Code(s)
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EditCodeModal;
