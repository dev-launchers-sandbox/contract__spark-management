import React, { useState, useEffect } from "react";
import style from "./ManageCodesPage.module.css";

import MockAdapter from "axios-mock-adapter";
import Header from "../../../components/common/Header/Header";
import DataGridComponent from "../../../components/common/DataGrid/DataGrid";
import GenerateCode from "../ManageCodesPage/Modals/GenerateCode/GenerateCode.js";
import GenerateClient from "../ManageCodesPage/Modals/GenerateClient/GenerateClient.js";
import EditCodeModal from "../ManageCodesPage/Modals/EditCodeModal/EditCodeModal.js";
import EditClientModal from "../ManageCodesPage/Modals/EditClient/EditClient.js";
import FilterButtonModal from "../ManageCodesPage/Modals/FilterButtonModal/FilterButtonModal.js";
import SortByButtonModal from "../ManageCodesPage/Modals/SortByButtonModal/SortByButtonModal.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
  Link,
  useRouterHistory,
} from "react-router-dom";
import SortByDropdowns from "./Dropdowns/SortBy/SortBy";
import FilterByDropdowns from "./Dropdowns/FilterBy/FilterBy";
import axios from "axios";

const NUM_ROWS_PER_PAGE = 50;

function ManageCodesPage() {
  let [showGenerateCodeModal, setShowGenerateCodeModal] = useState(false);
  let [showGenerateClientModal, setShowGenerateClientModal] = useState(false);
  let [showEditCodeModal, setShowEditCodeModal] = useState(false);
  let [showEditClientModal, setShowEditClientModal] = useState(false);
  let [showFilterButtonModal, setShowFilterButtonModal] = useState(false);
  let [showSortByButtonModal, setShowSortByButtonModal] = useState(false);
  const [
    showDeleteConfirmationModal,
    setShowDeleteConfirmationModal,
  ] = useState(false);
  let [rowToEdit, setRowToEdit] = useState();
  let [clientToEdit, setClientToEdit] = useState();
  let [codes, setCodes] = useState("");
  let [gridHeight, setGridHeight] = useState();
  let [showArrows, setShowArrows] = useState({ front: false });
  let [page, setPage] = useState(0);
  let [currentChanges, setCurrentChanges] = useState();
  const [rowToDelete, setRowToDelete] = useState();
  const [clientToDelete, setClientToDelete] = useState();
  const [type, setType] = useState();

  const handleGenerateCodeShowModal = () => {
    //Shows the Generate Code Modal.
    setShowGenerateCodeModal(true);
  };
  const handleGenerateClientShowModal = () => {
    //Shows the Generate Client Modal.
    setShowGenerateClientModal(true);
  };
  const handleEditCodeShowModal = () => {
    //Shows the Edit Code Modal.
    setShowEditCodeModal(true);
  };

  const handleEditClientModal = () => {
    //Shows the Edit Client Modal.
    setShowEditClientModal(true);
  };
  const handleDeleteConfirmation = () => {
    //Shows the Delete Confirmation Modal.
    setShowDeleteConfirmationModal(true);
  };
  const handleFilterButtonModaal = () => {
    //Shows the Filter Modal.
    setShowFilterButtonModal(true);
  };

  const handleSortByButtonModaal = () => {
    //Shows the Sort Modal.
    setShowSortByButtonModal(true);
  };

  //Called whenever the Edit Code Modal shows. rowToEdit is passed as props to the modal.
  const updateCodeToEdit = (value) => {
    setRowToEdit(value);
  };

  // Called whenever the Edit Client Modal shows. clientToEdit is passed as props to the modal
  const updateClientToEdit = (id) => {
    setClientToEdit(id);
  };

  // Called whenever the view is reset (sort, filter, reset view), to prevent blank pages
  const resetPage = () => {
    setPage(0);
  };

  // Sets rowToDelete or clientToDelete, depending on the delete type, to the row passed in the parameters
  // This way, we can pass rowToDelete, and clientToDelete to the Delete Modal
  const handleDelete = (type, row) => {
    setType(type);
    if (type === "code") {
      setRowToDelete(row);
    }
    if (type === "client") {
      setClientToDelete(row);
    }
    handleDeleteConfirmation(); //Shows the delete confirmation modal
  };

  /* Called whenever the rows must be updated. This updates what the grid shows, by making a get request
   to the server with the special parameters as needed.
*/
  async function updateRows(changes) {
    let codesFetch;
    //If changes are passed, send a request with them as parameters; ignoring the previous sorts&filters.
    if (changes) {
      codesFetch = await axios.get(
        `https://api.spark4community.com/codes?skip=${
          page * NUM_ROWS_PER_PAGE
        }&limit=${NUM_ROWS_PER_PAGE}${changes}`
      );
      //Update currentChanges, so page refreshing does not undo the filter/sorters
      setCurrentChanges(changes);
    } else {
      // If there are currentChanges, send a request with them as parameters
      if (currentChanges && currentChanges !== "") {
        codesFetch = await axios.get(
          `https://api.spark4community.com/codes?skip=${
            page * NUM_ROWS_PER_PAGE
          }&limit=${NUM_ROWS_PER_PAGE}${currentChanges}`
        );
      } else {
        //if there aren’t any currentChanges, or changes passed, send the get req. with no parameters.
        codesFetch = await axios.get(
          `https://api.spark4community.com/codes?skip=${
            page * NUM_ROWS_PER_PAGE
          }&limit=${NUM_ROWS_PER_PAGE}&sort=-createdAt`
        );
      }
    }
    let codeArray = codesFetch.data;
    try {
      // Removes miliseconds for the dates
      codeArray.forEach((code) => {
        let shortExp = code.expiration_date.substring(0, 10);
        code.expiration_date = shortExp;
      });
      codeArray.forEach((code) => {
        let shortCreated = code.createdAt.substring(0, 10);
        code.createdAt = shortCreated;
      });
    } catch (err) {
      console.log(err);
    }
    setCodes(codeArray); //Update codes, which updates the rows.
  }

  //Called whenever the user clicks nextPage
  const addPage = () => {
    setPage(page + 1);
  };

  //Called whenever the user clicks previous page
  const substractPage = () => {
    setPage(page - 1);
  };

  //Called whenever the user wants to get rid of all filters and sorts.
  const resetFiltersAndSorts = () => {
    setCurrentChanges();
  };

  // Whenever the current sorts and filters change, update the rows.
  useEffect(() => {
    updateRows();
  }, [currentChanges]);

  //Whenever the page changes, update the rows to show the new page.
  useEffect(() => {
    updateRows();
  }, [page]);

  //Whenever the codes change, update the length of the grid to make it adaptive to the number of rows.
  useEffect(() => {
    let numberOfRows = codes.length + 1;
    if (codes.length < 10) numberOfRows = 10;
    setGridHeight(numberOfRows * 36 + 5);
  }, [codes]);

  return (
    <div>
      <div className={style.manageCodesPage}>
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
        <EditCodeModal
          showModal={showEditCodeModal}
          handleCloseModal={() => {
            setShowEditCodeModal(false);
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
          updateRows={updateRows}
          handleDelete={handleDelete}
        />
        <FilterButtonModal
          showModal={showFilterButtonModal}
          resetPage={resetPage}
          handleCloseModal={() => {
            setShowFilterButtonModal(false);
          }}
          clientToEdit={clientToEdit}
          updateRows={updateRows}
          resetFiltersAndSorts={resetFiltersAndSorts}
          page={page}
          substractPage={substractPage}
          codes={codes}
          addPage={addPage}
          substractPage={substractPage}
          NUM_ROWS_PER_PAGE={NUM_ROWS_PER_PAGE}
        />
        <SortByButtonModal
          showModal={showSortByButtonModal}
          handleCloseModal={() => {
            setShowSortByButtonModal(false);
          }}
          clientToEdit={clientToEdit}
          updateRows={updateRows}
          resetFiltersAndSorts={resetFiltersAndSorts}
          page={page}
          substractPage={substractPage}
          codes={codes}
          addPage={addPage}
          substractPage={substractPage}
          NUM_ROWS_PER_PAGE={NUM_ROWS_PER_PAGE}
          resetPage={resetPage}
        />
        <div className={style.buttonContainer}>
          <button onClick={handleGenerateCodeShowModal}>+ Code 🔑</button>
          <button onClick={handleGenerateClientShowModal}>+ Client 💼</button>
          <Link to="/CreateNewUser">
            <button>+ User 👤</button>
          </Link>
        </div>
      </div>
      <DataGridComponent
        updateRows={updateRows}
        handleEditCodeShowModal={handleEditCodeShowModal}
        updateCodeToEdit={updateCodeToEdit}
        codes={codes}
        gridHeight={gridHeight}
        handleEditClientModal={handleEditClientModal}
        updateClientToEdit={updateClientToEdit}
        showDeleteConfirmationModal={showDeleteConfirmationModal}
        handleDeleteConfirmation={handleDeleteConfirmation}
        handleClose={() => setShowDeleteConfirmationModal(false)}
        handleDelete={handleDelete}
        type={type}
        rowToDelete={rowToDelete}
        clientToDelete={clientToDelete}
      />
      <div className={style.pageButtons}>
        {page > 0 && (
          <button className={style.lastPageButton} onClick={substractPage}>
            {" Previous Page"}
          </button>
        )}
        {codes.length === NUM_ROWS_PER_PAGE && (
          <button className={style.nextPageButton} onClick={addPage}>
            {" Next Page"}
          </button>
        )}
      </div>
      <div className={style.buttonContainer}>
        <button onClick={handleFilterButtonModaal}>🎛️ Filter</button>
        <button onClick={handleSortByButtonModaal}>📚 Sort</button>
      </div>
      <div className={style.resetFiltersAndSorts}>
        <button onClick={resetFiltersAndSorts}>⬜ Reset View</button>
      </div>
    </div>
  );
}

export default ManageCodesPage;
