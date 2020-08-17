import React, { useEffect, useState } from "react";
import ReactDataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
import style from "./DataGrid.module.css";
import axios from "axios";
import Modal from "../Modal/Modal";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { css } from "glamor";

const notify = (text) => {
  toast(text, {
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
  const [clientToDelete, setClientToDelete] = useState();
  const [type, setType] = useState();

  const ClientActions = (value) => {
    console.log("value", value.row.client_name);
    return (
      <div
        onClick={() => handleEditClient(value.row)}
        className={style.clientActionsContainer}
      >
        {value.row.client_name}
      </div>
    );
  };
  const CodeAction = (value) => {
    return (
      <div>
        {value.row._id}
        <CopyToClipboard text={value.row._id}>
          <span
            className={style.copyToClipBoard}
            onClick={() => handleCopy()}
            role="img"
            aria-label="copy"
          >
            ️{"   📋"}
          </span>
        </CopyToClipboard>
      </div>
    );
  };
  const Actions = ({ value, row }) => {
    return (
      <div className={style.actionsContainer}>
        <span
          className={style.deleteIcon}
          onClick={() => handleDelete("code", row)}
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
      </div>
    );
  };
  const columns = [
    { key: "_id", name: "Code", formatter: CodeAction },
    { key: "client_name", name: "Client", formatter: ClientActions },
    { key: "sub_client_name", name: "Sub Client" },
    { key: "expiration_date", name: "Expiration Date" },
    { key: "createdAt", name: "Created On" },
    { key: "deck_name", name: "Deck" },
    { key: "user_creator_name", name: "Created by" },
    { key: "code_actions", name: "", formatter: Actions },
  ];

  const handleDelete = (type, row) => {
    setType(type);
    if (type === "code") {
      setRowToDelete(row);
    }
    if (type === "client") {
      setClientToDelete(row);
    }
    setShowDeleteConfirmationModal(true);
  };
  const handleCopy = () => {
    notify("Code Copied To Clipboard!");
  };
  const handleEdit = (row) => {
    props.handleEditShowModal();
    props.updateCodeToEdit(row);
  };
  const handleEditClient = async (row) => {
    let clientFetch = await axios.get(
      `https://api.spark4community.com/clients`
    );
    let clients = clientFetch.data;
    let clientToEdit = clients.find(
      (client) => client.name === row.client_name
    );
    if (!clientToEdit) return notify("This client does not exist anymore");
    console.log(clientToEdit._id);
    props.updateClientToEdit(clientToEdit._id);
    props.handleEditClientModal();
  };
  const redirectDelete = () => {
    if (type === "code") deleteCode();
    if (type === "client") deleteClient();
  };
  const deleteCode = async () => {
    let row = rowToDelete;
    try {
      await axios.delete(`https://api.spark4community.com/codes/${row._id}`);
      props.updateRows();
      handleCloseModal();
    } catch (err) {
      alert("There was an error while deleting the code");
      props.updateRows();
    }
  };

  const deleteClient = async () => {
    let fetchClients = await axios.get(
      `https://api.spark4community.com/clients`
    );
    let clients = fetchClients.data;
    let clientFound = clients.find(
      (client) => client.name === clientToDelete.client_name
    );
    try {
      await axios.delete(
        `https://api.spark4community.com/clients/${clientFound._id}`
      );
      props.updateRows();
    } catch {
      alert("There was an error while deleting the client");
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
  useEffect(() => {}, [clientToDelete]);
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
            Are you sure you want to delete this {type}?
          </p>
          <div className={style.buttonContainer}>
            <button onClick={redirectDelete}> Yes </button>
            <button onClick={handleCloseModal}> No </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default DataTable;
