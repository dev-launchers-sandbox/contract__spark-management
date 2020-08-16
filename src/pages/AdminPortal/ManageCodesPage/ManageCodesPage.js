import React, { useState, useEffect } from "react";
import style from "./ManageCodesPage.module.css";

import MockAdapter from "axios-mock-adapter";
import Header from "../../../components/common/Header/Header";
import DataGridComponent from "../../../components/common/DataGrid/DataGrid";
import GenerateCode from "../../../components/common/GenerateCode/GenerateCode.js";
import GenerateClient from "../../../components/common/GenerateClient/GenerateClient.js";
import EditModal from "../../../components/common/EditModal/EditModal.js";
import EditClientModal from "../../../components/common/EditClient/EditClient.js";

import SortByDropdowns from "./Dropdowns/SortBy/SortBy";
import FilterByDropdowns from "./Dropdowns/FilterBy/FilterBy";
import axios from "axios";

const NUM_ROWS_PER_PAGE = 50;

function ManageCodesPage() {
  let [showGenerateCodeModal, setShowGenerateCodeModal] = useState(false);
  let [showGenerateClientModal, setShowGenerateClientModal] = useState(false);
  let [showEditModal, setShowEditModal] = useState(false);
  let [showEditClientModal, setShowEditClientModal] = useState(false);
  let [rowToEdit, setRowToEdit] = useState();
  let [clientToEdit, setClientToEdit] = useState();
  let [codes, setCodes] = useState("");
  let [gridHeight, setGridHeight] = useState();
  let [showArrows, setShowArrows] = useState({ front: false });
  let [page, setPage] = useState(0);
  let [currentChanges, setCurrentChanges] = useState();
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

  const handleEditClientModal = () => {
    setShowEditClientModal(true);
  };

  const updateCodeToEdit = (value) => {
    setRowToEdit(value);
  };
  const updateClientToEdit = (id) => {
    setClientToEdit(id);
  };
  async function updateRows(changes) {
    let codesFetch;
    if (changes) {
      codesFetch = await axios.get(
        `https://api.spark4community.com/codes?skip=${
          page * NUM_ROWS_PER_PAGE
        }&limit=${NUM_ROWS_PER_PAGE}${changes}`
      );
      setCurrentChanges(changes);
    } else {
      if (currentChanges && currentChanges !== "") {
        codesFetch = await axios.get(
          `https://api.spark4community.com/codes?skip=${
            page * NUM_ROWS_PER_PAGE
          }&limit=${NUM_ROWS_PER_PAGE}${currentChanges}`
        );
        console.log("codes", codesFetch);
      } else {
        codesFetch = await axios.get(
          `https://api.spark4community.com/codes?skip=${
            page * NUM_ROWS_PER_PAGE
          }&limit=${NUM_ROWS_PER_PAGE}&sort=-createdAt`
        );
      }
    }
    let codeArray = codesFetch.data;
    setCodes(codeArray);
  }

  const addPage = () => {
    setPage(page + 1);
  };

  /*
  ok lets think of I do
  updateRows(parame) {
    axios.get(parame + state for past)
}

  */
  const resetFiltersAndSorts = () => {
    setCurrentChanges();
  };
  const substractPage = () => {
    setPage(page - 1);
  };
  useEffect(() => {
    updateRows();
  }, [currentChanges]);
  useEffect(() => {
    updateRows();
  }, [page]);

  useEffect(() => {
    let numberOfRows = codes.length + 1;
    if (codes.length < 10) numberOfRows = 10;
    setGridHeight(numberOfRows * 35 + 5);
  }, [codes]);

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
        <EditClientModal
          showModal={showEditClientModal}
          handleCloseModal={() => {
            setShowEditClientModal(false);
          }}
          clientToEdit={clientToEdit}
        />
        <div className={style.buttonContainer}>
          <button onClick={handleGenerateCodeShowModal}>+ Code</button>
          <button onClick={handleGenerateClientShowModal}>+ Client</button>
        </div>
      </div>
      <DataGridComponent
        updateRows={updateRows}
        handleEditShowModal={handleEditShowModal}
        updateCodeToEdit={updateCodeToEdit}
        codes={codes}
        gridHeight={gridHeight}
        handleEditClientModal={handleEditClientModal}
        updateClientToEdit={updateClientToEdit}
      />
      <div className={style.dropdownsContainer}>
        <SortByDropdowns updateRows={updateRows} />
        <FilterByDropdowns updateRows={updateRows} />
        <div className={style.resetFiltersAndSorts}>
          <button onClick={resetFiltersAndSorts}>Reset</button>
        </div>
      </div>
      <div className={style.changePageButtons}>
        {page > 0 && (
          <button className={style.lastPageButton} onClick={substractPage}>
            {" Last Page"}
          </button>
        )}
        {codes.length === NUM_ROWS_PER_PAGE && (
          <button className={style.nextPageButton} onClick={addPage}>
            {" Next Page"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ManageCodesPage;
