import React, { useState } from "react";
import style from "./ManageCodesPage.module.css";

import MockAdapter from "axios-mock-adapter";
import Header from "../../../components/common/Header/Header";
import DataGridComponent from "../../../components/common/DataGrid/DataGrid";
import GenerateCode from "../../../components/common/GenerateCode/GenerateCode.js";
import GenerateClient from "../../../components/common/GenerateClient/GenerateClient.js";
import EditModal from "../../../components/common/EditModal/EditModal.js";
import SortByDropdowns from "./Dropdowns/SortBy/SortBy";

function ManageCodesPage() {
  let [showGenerateCodeModal, setShowGenerateCodeModal] = useState(false);
  let [showGenerateClientModal, setShowGenerateClientModal] = useState(false);
  let [showEditModal, setShowEditModal] = useState(false);

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
        />
        <GenerateClient
          showModal={showGenerateClientModal}
          handleCloseModal={() => {
            setShowGenerateClientModal(false);
          }}
        />
        <EditModal
          showModal={showEditModal}
          handleCloseModal={() => {
            setShowEditModal(false);
          }}
        />
        <div className={style.buttonContainer}>
        <button onClick={handleGenerateCodeShowModal}>+ Code</button>
        <button onClick={handleGenerateClientShowModal}>
          + Client
        </button>
        <button onClick={handleEditShowModal}>open EditModal</button>

        </div>
      </div>
      <DataGridComponent />
      <div className={style.dropdownsContainer}>
        <SortByDropdowns />
      </div>

    </div>
  );
}

export default ManageCodesPage;
