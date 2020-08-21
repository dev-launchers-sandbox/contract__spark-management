import React, { useState, useEffect } from "react";
import style from "./EditModal.module.css";
import Modal from "../Modal/Modal.js";
import axios from "axios";
import Select from "react-select";
import notify from "../notify/notify.js"

function EditModal(props) {
  let [client, setClient] = useState([]);
  let [codeData, setCodeData] = useState({
    clientName: "",
    expirationDate: "",
    deckName: "",
    subClientName: "",
  });

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

  const getClientData = async () => {
    const clientData = await axios.get(
      "https://api.spark4community.com/clients"
    );

    setClient(clientData.data);
  };

  const getDeckData = async () => {
    const deckData = await axios.get("https://api.spark4community.com/decks");
    setDeck(deckData.data);
  };

  const getCodeData = async () => {
    const codeDataResponse = await axios.get(
      `https://api.spark4community.com/codes/${props.rowToEdit._id}`
    );
    /*
    setCodeData({
      ...codeData,
      clientName: codeDataResponse.data.code.client_name,
      expirationDate: codeDataResponse.data.code.expiration_date,
      deckName: codeDataResponse.data.code.deck_name,
      subClientName: codeDataResponse.data.code.sub_client_name
    });
    */
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
  useEffect(() => {
    getClientData();
    getDeckData();
  }, []);

  useEffect(() => {
    if (!props.rowToEdit) return;
    getCodeData();
  }, [props.rowToEdit]);

  const handleSelectChange = (formClient) => {
    setFormClient(formClient);
  };

  const handleDeckSelectChange = (deckForm) => {
    setDeckForm(deckForm);
  };
  useEffect(() => {
    console.log("FORMCLIENT", formClient);
  }, [formClient]);
  //it's called when users inputs data into the form
  const handleSubClientChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      subClient: value,
    });
  };

  const handleExpirationDateChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      expirationDate: value,
    });
  };

  const formValidation = () => {
    if (formClient.length !== 0 && form.expirationDate.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const updateCodeData = async () => {
    const codeBatch = {
      deck_name: deckForm.value,
      client_name: formClient.value,
      expiration_date: form.expirationDate,
      sub_client_name: form.subClient,
    };
    try {
      //sends the data to /code_batch

      const response = await axios.put(
        `https://api.spark4community.com/codes/${props.rowToEdit._id}`,
        codeBatch
      );

      notify("The code data has been updated!");
      props.handleCloseModal();
      props.updateRows();
    } catch (err) {
      console.error(err);
      notify("Something went wrong with sending the data");
    }
  };
  const handleSubmit = (events) => {
    //prevents page from refreshing
    events.preventDefault();

    updateCodeData();
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

  const onBlur = (events) => {
    events.target.type = "text";
  };

  const onFocus = (events) => {
    events.target.type = "date";
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

export default EditModal;
