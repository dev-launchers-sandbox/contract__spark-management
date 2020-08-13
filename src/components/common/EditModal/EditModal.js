import React, { useState, useEffect } from "react";
import style from "./EditModal.module.css";
import Modal from "../Modal/Modal.js";
import axios from "axios";
import Select from "react-select";

function EditModal(props) {
  let [client, setClient] = useState([]);
  let [form, setForm] = useState({
    communityDeck: 0,
    conversationalDeck: 0,
    spanishDeck: 0,
    youthDeck: 0,
    client: "",
    expirationDate: ""
  });

  let [formClient, setFormClient] = useState("");

  useEffect(() => {
    /*
    const getCodeData = async () => {
      const response = await axios.get("/codes", {
        params: { id: 1 }
      });

      console.log("specific code data: ", response.data);
    };
    */
    const getClientData = async () => {
    const clientData = await axios.get("http://192.232.212.61:8080/clients");

      console.log("clients: ", clientData);
      setClient(clientData.data);
    };
    getClientData();
    //getCodeData();
  }, []);

  const handleSelectChange = (formClient) => {
    setFormClient(formClient);
    console.log("option selected: ", formClient);
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
        client_name: formClient.value,
        expiration_date: form.expirationDate
      };
      try {
        console.log(codeBatch);
        //sends the data to /code_batch
        const data = await axios.put(
          "/code_batch",
          { params: { id: 1 } },
          codeBatch
        );
        console.log("Data has been sent!");

        console.log("config: ", data.config.data);
        console.log("Data: ", data.data);
        console.log("Response: ", data);
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

  const selectOptions = () => {
    let newOptions = [];
    for (let i = 0; i < client.length; i++) {
      let currentClient = client[i];

      const options = {
        value: currentClient.client,
        label: currentClient.client
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
            <h2>Edit Code/Client</h2>
          </div>
          <div className={style.formContainer}>
            <form className={style.form} onSubmit={handleSubmit}>
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
