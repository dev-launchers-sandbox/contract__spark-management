import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal.js";
import ReactDataGrid from "react-data-grid";
import SortByDropdowns from "../../../pages/AdminPortal/ManageCodesPage/Dropdowns/SortBy/SortBy.js";
import FilterByDropdowns from "../../../pages/AdminPortal/ManageCodesPage/Dropdowns/FilterBy/FilterBy.js";
import "react-data-grid/dist/react-data-grid.css";
import style from "./FilterButton.module.css";
import axios from "axios";

function FilterButtonModal(props){
  useEffect(() => {
    console.log("props.page value: ", props.page)
    console.log("props.codes length value: ", props.codes.length)
  })
  return (
    <div className={style.buttonHolder}>
    <Modal
      overlayClick={true}
      height="40vh"
      color="#f3e8cb"
      showModal={props.showModal}
      handleCloseModal={props.handleCloseModal}
    >
    <div className={style.dropdownsContainer}>
      <div className={style.filterByColumnDropdown}>
        <FilterByDropdowns updateRows={props.updateRows} handleCloseModal={props.handleCloseModal}/>
      </div>
    </div>
    </Modal>
    </div>
  )
}

export default FilterButtonModal;
