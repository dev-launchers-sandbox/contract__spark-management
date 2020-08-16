import React, { useState, useEffect } from "react";
import style from "./EditModal.module.css";
import Modal from "../Modal/Modal.js";
import axios from "axios";
import Select from "react-select";

function EditModal(props) {
  let [client, setClient] = useState([]);
  let [codeData, setCodeData] = useState({
    clientName: "",
    expirationDate: "",
    deckName: "",
    subClientName: ""
  })

  let [form, setForm] = useState({
    client: "",
    expirationDate: "",
    subClient: ""
  });

  let [formClient, setFormClient] = useState("");
  let [deckForm, setDeckForm] = useState("")

  let [deck, setDeck] = useState([]);


  const getClientData = async () => {
    const clientData = await axios.get("http://192.232.212.61:80/clients");
      console.log("clients: ", clientData);
      setClient(clientData.data);
      console.log("end of getClient func")

  };

  const getDeckData = async () => {

    const deckData = await axios.get("http://192.232.212.61:80/decks")
    console.log("deck name: ", deckData)
    setDeck(deckData.data)
    console.log("end of getDeck func")

  }

  const getCodeData = async () => {
    if(!props.rowToEdit) return;
      const codeDataResponse = await axios.get(`http://192.232.212.61:80/codes/${props.rowToEdit._id}`)
        console.log("code data: ", codeDataResponse);
        console.log("end of getDeck func")
        setCodeData({
        ...codeData,
        clientName: codeDataResponse.data.code.client_name,
        expirationDate: codeDataResponse.data.code.expiration_date,
        deckName: codeDataResponse.data.code.deck_name,
        subClientName: codeDataResponse.data.code.sub_client_name
    })

  }
  useEffect(() => {
    console.log("edit modal mounted");

    getClientData();
    getDeckData()
  }, []);

useEffect(() => {
  getCodeData()
}, [props.rowToEdit])

  const handleSelectChange = (formClient) => {
    setFormClient(formClient);
    console.log("option selected: ", formClient);
  };

  const handleDeckSelectChange = (deckForm) => {
    setDeckForm(deckForm);
    console.log("option deck selected: ", deckForm);
  };

  //it's called when users inputs data into the form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
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
    if (formValidation() === true) {
      const codeBatch = {
        deck_name: deckForm.value,
        client_name: formClient.value,
        expiration_date: form.expirationDate,
        sub_client_name: form.subClient
      };
      try {
        console.log(codeBatch);

        //sends the data to /code_batch
        const response = await axios.put(`http://192.232.212.61:80/codes/${props.rowToEdit._id}`, codeBatch);
        console.log("updated datd: ", response)
        console.log("Data has been sent!");
        props.handleCloseModal()
        props.updateRows()
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Forms can't be empty!");
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
        label: currentData.name
      };

      newOptions.push(options);
    }
    return newOptions;
  };

  const onBlur = (events) => {
    console.log("onBlur function is being called");
    events.target.type = "text";
  }

  const onFocus = (events) => {
    console.log("onFocus function is being called");
    events.target.type = "date";
  }


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
            <h2>Edit Code/Client</h2>
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
                      placeholder={codeData.deckName}
                      options={selectOptions(deck)}
                    />
                  </div>
                </div>
              <br />
              <div className={style.row}>
                <label>Sub Client</label>
                <input
                  name="subClient"
                  onChange={handleChange}
                  className={style.subClientText}
                  value={form.subClient}
                  type="text"
                  placeholder={codeData.subClientName}
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
                      placeholder={codeData.clientName}
                      options={selectOptions(client)}
                    />
                  </div>
                </div>
                <div className={style.expDateContainer}>
                  <div className={style.expDateText}>
                    <label>Exp.Date</label>
                  </div>
                  <input
                    type="text"
                    className={style.expirationDateText}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    name="expirationDate"
                    onChange={handleChange}
                    value={form.expirationDate}
                    placeholder={codeData.expirationDate.substr(0, 10)}
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
