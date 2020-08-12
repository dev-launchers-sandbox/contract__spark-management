import React, { useEffect, useState } from "react";
import ReactDataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
import style from "./DataGrid.module.css";
import axios from "axios";
import mockData from "../../../mockData/MockData";

mockData();
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
  { key: "code", name: "Code" },
  { key: "client_name", name: "Client" },
  { key: "deck", name: "Deck" },
  { key: "username", name: "Created By" },
  { key: "created_at", name: "Created At" },
  { key: "expiration_date", name: "Exp. Date" },
  { key: "button", name: "Button", formatter: ButtonFormatter }
];

function DataTable() {
  const [codes, setCodes] = useState("");

  async function updateRows() {
    let codesFetch = await axios.get("/codes");
    let codeArray = codesFetch.data.codes;
    setCodes(codeArray);
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
