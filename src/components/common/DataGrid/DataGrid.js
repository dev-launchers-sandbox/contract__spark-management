import React, { useEffect, useState } from "react";
import ReactDataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
import style from "./DataGrid.module.css";
import axios from "axios";
import Modal from "../Modal/Modal";
import notify from "../notify/notify.js"
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { css } from "glamor";

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
    notify("Code copied to clipboard!");
  };
  const handleEdit = (row) => {
    props.handleEditCodeShowModal();
    props.updateCodeToEdit(row);
  };
  const copyRow = (row) => {
    let code = `${row._id}, `;
    let client = `${row.client_name}, `;
    let subclient = (row.sub_client_name || "None") + ", ";
    let expiration_date = `${row.expiration_date}`;
    let rowToCopy = code + client + subclient + expiration_date;
    return rowToCopy;
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
  const RowRenderer = ({ renderBaseRow, ...props }) => {
    console.log(renderBaseRow);
    let color = "green";
    return (
      <div style={{ backgroundColor: color }}>{renderBaseRow(...props)}</div>
    );
  };
  return (
    <div>
      <div className={style.DataGrid}>
        <ReactDataGrid
          height={props.gridHeight}
          columns={columns}
          rows={props.codes}
          rowRendered={RowRenderer}
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
