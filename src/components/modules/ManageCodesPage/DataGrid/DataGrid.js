import React, { useEffect, useState } from "react";
import ReactDataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
import style from "./DataGrid.module.css";
import axios from "axios";
import Modal from "../../../../components/common/Modal/Modal";
import notify from "../../../../utils/notify.js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { css } from "glamor";
import Button from "../../../../components/common/Button/Button";
toast.configure();
function DataTable(props) {
  const [
    showDeleteConfirmationModal,
    setShowDeleteConfirmationModal,
  ] = useState(false);
  const [codes, setCodes] = useState("");

  //A formatter for the clients.
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
  //A formatter for the codes.
  const CodeAction = (value) => {
    function expiredColor() {
      let now = Date.now();
      let exp = new Date(value.row.expiration_date).getTime();
      if (now > exp) {
        return "red";
      } else {
        return "black";
      }
    }
    return (
      <div style={{ color: expiredColor() }}>
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
  //A formatter for the available actions
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
          ️✏️
        </span>
        <CopyToClipboard text={copyRow(row)}>
          <span
            onClick={() => notify("Row copied to clipboard!")}
            className={style.editIcon}
            role="img"
            aria-label="edit"
          >
            📓
          </span>
        </CopyToClipboard>
      </div>
    );
  };
  // Array of all the columns that will show in the grid
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
  //Lets the user know the "copy to clipboard" was successfull
  const handleCopy = () => {
    notify("Code copied to clipboard!");
  };

  //Called whenever the user wants to edit a code.
  const handleEdit = (row) => {
    props.handleEditCodeShowModal();
    props.updateCodeToEdit(row);
  };

  //Copies the entire row in CSV format.
  const copyRow = (row) => {
    let code = `${row._id}, `;
    let client = `${row.client_name}, `;
    let subclient = (row.sub_client_name || "None") + ", ";
    let expiration_date = `${row.expiration_date}`;
    let rowToCopy = code + client + subclient + expiration_date;
    return rowToCopy;
  };

  //Called whenever the user wants to edit a client.
  const handleEditClient = async (row) => {
    let clientFetch = await axios.get(
      `https://api.spark4community.com/clients`
    );
    let clients = clientFetch.data;
    // Finds the client matching the name of the row, to later get the id
    let clientToEdit = clients.find(
      (client) => client.name === row.client_name
    );
    //If the client has been deleted, meaning it does not exist, we prevent the error.
    if (!clientToEdit) return notify("This client does not exist anymore");
    props.updateClientToEdit(clientToEdit._id);
    props.handleEditClientModal();
  };

  //Prevents code repetition, by having the same modal for deleting the client and code(s).
  const redirectDelete = () => {
    if (props.type === "code") deleteCode();
    if (props.type === "client") deleteClient();
  };

  //Called whenever a user wants to delete a code. It removed the code from the database.
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

  //Called whenever a user wants to delete a client. It removed the client from the database.
  const deleteClient = async () => {
    let fetchClients = await axios.get(
      `https://api.spark4community.com/clients`
    );
    let clients = fetchClients.data;
    // Finds the client matching the name of the row, to later get the id
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
              <Button style={{ color: "black" }} onClick={redirectDelete}>
                {" "}
                Yes{" "}
              </Button>
              <Button style={{ color: "black" }} onClick={props.handleClose}>
                {" "}
                No{" "}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default DataTable;

/*
<button onClick={redirectDelete}> Yes </button>
<button onClick={props.handleClose}> No </button>
*/
