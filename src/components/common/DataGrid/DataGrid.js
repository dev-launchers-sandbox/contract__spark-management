import React, { useEffect, useState } from "react";
import ReactDataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
import style from "./DataGrid.module.css";
import axios from "axios";
import Modal from "../Modal/Modal";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { css } from "glamor";

const notify = () => {
  toast("Code Copied To Clipboard!", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2500,
    className: css({
      background: "white",
    }),
    bodyClassName: css({
      fontSize: "20px",
      color: "black",
    }),
    progressClassName: css({
      background: "repeating-radial-gradient( transparent, transparent )",
    }),
  });
};

toast.configure();
function DataTable(props) {
  const [
    showDeleteConfirmationModal,
    setShowDeleteConfirmationModal,
  ] = useState(false);
  const [codes, setCodes] = useState("");
  const [rowToDelete, setRowToDelete] = useState();

  const Actions = ({ value, row }) => {
    return (
      <div className={style.buttonContainer}>
        <span
          className={style.deleteIcon}
          onClick={() => handleDelete(row)}
          role="img"
          aria-label="delete"
        >
          ️🗑️
        </span>
        <span
          onClick={() => handleEdit(row)}
          className={style.editIcon}
          role="img"
          aria-label="edit"
        >
          ️📝
        </span>
        <CopyToClipboard text={row._id}>
          <span
            className={style.copyToClipBoard}
            onClick={() => handleCopy()}
            role="img"
            aria-label="copy"
          >
            ️📋
          </span>
        </CopyToClipboard>
      </div>
    );
  };
  const columns = [
    { key: "_id", name: "Code" },
    { key: "client_name", name: "Client" },
    { key: "sub_client_name", name: "Sub Client" },
    { key: "expiration_date", name: "Expiration Date" },
    { key: "createdAt", name: "Created On" },
    { key: "deck_name", name: "Deck" },
    { key: "user_creator_name", name: "Created by" },
    { key: "button", name: "", formatter: Actions },
  ];

  const handleDelete = (row) => {
    setRowToDelete(row);
    setShowDeleteConfirmationModal(true);
  };
  const handleCopy = () => {
    notify();
  };
  const handleEdit = (row) => {
    props.handleEditShowModal();
    props.updateCodeToEdit(row);
  };
  const deleteCode = async () => {
    let row = rowToDelete;
    try {
      await axios.delete(`http://192.232.212.61:80/codes/${row._id}`);
      props.updateRows();
      handleCloseModal();
    } catch (err) {
      alert("There was an error while deleting the code");
      props.updateRows();
    }
  };

  useEffect(() => {
    props.updateRows();
  }, []);
  const handleCloseModal = () => {
    setShowDeleteConfirmationModal(false);
  };
  const gridHeight = () => {
    let numberOfCodes = props.codes.lenght;
    alert(numberOfCodes * 35);
    return numberOfCodes * 35;
  };
  return (
    <div>
      <div className={style.DataGrid}>
        <ReactDataGrid
          height={props.gridHeight}
          columns={columns}
          rows={props.codes}
        />
      </div>
      <div className={style.deleteCodeConfirmation}>
        <Modal
          overlayClick={true}
          height={gridHeight}
          color="#f3e8cb"
          showModal={showDeleteConfirmationModal}
          handleCloseModal={handleCloseModal}
        >
          <p className={style.modalP}>
            {" "}
            Are you sure you want to delete this code?
          </p>
          <div className={style.buttonContainer}>
            <button onClick={deleteCode}> Yes </button>
            <button onClick={handleCloseModal}> No </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default DataTable;
