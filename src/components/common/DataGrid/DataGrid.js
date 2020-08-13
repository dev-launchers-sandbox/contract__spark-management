import React, { useEffect, useState } from "react";
import ReactDataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
import style from "./DataGrid.module.css";
import axios from "axios";
//import mockData from "../../../mockData/MockData";

//mockData();
const ButtonFormatter = ({ value }) => {
  return (
    <div className={style.buttonContainer}>
      <span role="img" aria-label="trashcan">
        ️🗑️
      </span>
    </div>
  );
};
const columns = [
  { key: "_id", name: "Code" },
  { key: "client_name", name: "Client" },
  { key: "sub_client_name", name: "Sub Client" },
  { key: "expiration_date", name: "Expiration Date"},
  {key: "createdAt", name: "Created On"},
  { key: "deck_name", name: "Deck"},
  { key: "user_creator_name", name: "Created by"},

  { key: "button", name: "Button", formatter: ButtonFormatter }
];

function DataTable() {
  const [codes, setCodes] = useState("");

  async function updateRows() {
    let codesFetch = await axios.get("http://192.232.212.61:8080/codes?limit=80");
    let codeArray = codesFetch.data;
    setCodes(codeArray);
  console.log("all the codes: ", codesFetch)
  }

  useEffect(() => {
    updateRows();
  }, []);



  return (
    <div>
      <div className={style.DataGrid}>
        <ReactDataGrid columns={columns} rows={codes} />
      </div>
    </div>
  );
}

export default DataTable;
