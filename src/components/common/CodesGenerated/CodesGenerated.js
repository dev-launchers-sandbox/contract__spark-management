import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal.js";
import ReactDataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
import style from "./CodesGenerated.module.css";

export default function CodesGenerated(props) {
  const [rows, setRows] = useState();
  const columns = [
    { key: "code", name: "Code" },
    { key: "client_name", name: "Client" },
    { key: "deck", name: "Deck" },
    { key: "username", name: "Created By" },
    { key: "created_at", name: "Created At" },
    { key: "expiration_date", name: "Exp. Date" }
  ];
  const generateMoreCodes = () => {
    props.openGenerateCode();
    props.handleCloseModal();
  };
  useEffect(() => {
    console.log("props", props);
    if (props.generatedCodes) {
      let generatedCodes = props.generatedCodes;
      let client = generatedCodes.client_name || "None";
      let expiration_date = generatedCodes.expiration_date || "None";
      let decks = generatedCodes.decks;
      let _id = "LALAL";
      let newCodes = [];
      for (let deck in decks) {
        for (let i = 0; i < decks[deck]; i++) {
          let newCode = {
            code: _id,
            client_name: client,
            deck: deck,
            username: "username",
            created_at: "IDK",
            expiration_date: expiration_date
          };
          newCodes.push(newCode);
        }
      }

      setRows(newCodes);
    }
  }, [props.generatedCodes]);
  return (
    <div>
      <Modal
        overlayClick={true}
        height="58vh"
        color="#f3e8cb"
        showModal={props.showModal}
        handleCloseModal={props.handleCloseModal}
      >
        <p className={style.modalP}> These are your codes! </p>
        <ReactDataGrid columns={columns} rows={rows} />
        <div className={style.buttonContainer}>
          <button onClick={generateMoreCodes}> Create More! </button>
          <button onClick={props.handleCloseModal}> I’m done! </button>
        </div>
      </Modal>
    </div>
  );
}
