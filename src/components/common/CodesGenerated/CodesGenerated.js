import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal.js";
import ReactDataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
import style from "./CodesGenerated.module.css";
import axios from "axios";
export default function CodesGenerated(props) {
  const [rows, setRows] = useState("");
  const columns = [
    { key: "_id", name: "Code" },
    { key: "client_name", name: "Client" },
    { key: "deck_name", name: "Deck" },
    { key: "user_creator_name", name: "Created By" },
    { key: "createdAt", name: "Created At" },
    { key: "expiration_date", name: "Exp. Date" },
  ];
  const generateMoreCodes = () => {
    props.openGenerateCode();
    props.handleCloseModal();
  };
  useEffect(() => {
    async function getNewCodes() {
      if (props.generatedCodes) {
        let codesGenerated = "";
        await axios
          .get(
            `https://api.spark4community.com/codes?code_batch_id=${props.generatedCodes}`
          )
          .then((newCodes) => (codesGenerated = newCodes.data));
        try {
          codesGenerated.forEach((code) => {
            let shortExp = code.expiration_date.substring(0, 10);
            code.expiration_date = shortExp;
          });
          codesGenerated.forEach((code) => {
            let shortCreated = code.createdAt.substring(0, 10);
            code.createdAt = shortCreated;
          });
        } catch (err) {
          console.log(err);
        }
        setRows(codesGenerated);
      }
    }
    getNewCodes();
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
