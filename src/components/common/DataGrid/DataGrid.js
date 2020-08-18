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

  const ClientActions = (value) => {
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
          onClick={() => props.handleDelete("code", row)}
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
    if (props.type === "code") deleteCode();
    if (props.type === "client") deleteClient();
  };
  const deleteCode = async () => {
    let row = props.rowToDelete;
    try {
      await axios.delete(`https://api.spark4community.com/codes/${row._id}`);
      props.updateRows();
      props.handleClose();
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
      (client) => client._id === props.clientToDelete
    );
    try {
      await axios.delete(
        `https://api.spark4community.com/clients/${clientFound._id}`
      );
      props.updateRows();
    } catch {
      alert("There was an error while deleting the client");
    }
    props.handleClose();
    notify("The client was deleted");
  };

  useEffect(() => {
    props.updateRows();
  }, []);

  const gridHeight = () => {
    let numberOfCodes = props.codes.lenght;
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
          showModal={props.showDeleteConfirmationModal}
          handleCloseModal={props.handleClose}
        >
          <div className={style.modalContainer}>
            {props.type === "code" && (
              <p className={style.modalP}>
                {" "}
                Are you sure you want to delete this {props.type}?
              </p>
            )}
            {props.type === "client" && (
              <div className={style.paragraphContainer}>
                <p className={style.modalP}>
                  {" "}
                  Are you sure you want to delete this {props.type}?
                </p>
                <p style={{ color: "red" }}>
                  {" "}
                  This will delete all codes assigned to this client!{" "}
                </p>
              </div>
            )}
            <div className={style.buttonContainer}>
              <button onClick={redirectDelete}> Yes </button>
              <button onClick={props.handleClose}> No </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default DataTable;
