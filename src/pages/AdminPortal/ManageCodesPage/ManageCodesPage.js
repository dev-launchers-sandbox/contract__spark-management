import React, { useState } from "react";
import style from "./ManageCodesPage.module.css";

import MockAdapter from "axios-mock-adapter";
import Header from "../../../components/common/Header/Header";
import DataGridComponent from "../../../components/common/DataGrid/DataGrid";
import GenerateCode from "../../../components/common/GenerateCode/GenerateCode.js";
import GenerateClient from "../../../components/common/GenerateClient/GenerateClient.js";
import EditModal from "../../../components/common/EditModal/EditModal.js";
import SortByDropdowns from "./Dropdowns/SortBy/SortBy";

import axios from "axios"

function ManageCodesPage() {
  let [showGenerateCodeModal, setShowGenerateCodeModal] = useState(false);
  let [showGenerateClientModal, setShowGenerateClientModal] = useState(false);
  let [showEditModal, setShowEditModal] = useState(false);
  let [rowToEdit,setRowToEdit] = useState()
  const [codes, setCodes] = useState("");

  const handleGenerateCodeShowModal = () => {
    setShowGenerateCodeModal(true);
    console.log("bool: ", showGenerateCodeModal);
  };
  const handleGenerateClientShowModal = () => {
    setShowGenerateClientModal(true);
  };
  const handleEditShowModal = () => {
    setShowEditModal(true);
  };
  const updateCodeToEdit = value => {
    setRowToEdit(value)
  }
  async function updateRows() {
    let codesFetch = await axios.get("http://192.232.212.61:80/codes?limit=80&sort=-createdAt");
    let codeArray = codesFetch.data;
    setCodes(codeArray);
  }

  return (
    <div>
      <div className={style.manageCodesPage}>
        <Header />
        <GenerateCode
          showModal={showGenerateCodeModal}
          handleCloseModal={() => {
            setShowGenerateCodeModal(false);
          }}
            openGenerateCode={handleGenerateCodeShowModal}
            updateRows={updateRows}
        />
        <GenerateClient
          showModal={showGenerateClientModal}
          handleCloseModal={() => {
            setShowGenerateClientModal(false);
          }}
          updateRows={updateRows}
        />
        <EditModal
          showModal={showEditModal}
          handleCloseModal={() => {
            setShowEditModal(false);
          }}
          rowToEdit={rowToEdit}
          updateRows={updateRows}
        />
        <div className={style.buttonContainer}>
        <button onClick={handleGenerateCodeShowModal}>+ Code</button>
        <button onClick={handleGenerateClientShowModal}>
          + Client
        </button>
        </div>
      </div>
      <DataGridComponent
      updateRows={updateRows}
      handleEditShowModal={handleEditShowModal}
      updateCodeToEdit={updateCodeToEdit}
      codes={codes}
      />
      <div className={style.dropdownsContainer}>
        <SortByDropdowns />
      </div>

    </div>
  );
}

export default ManageCodesPage;
