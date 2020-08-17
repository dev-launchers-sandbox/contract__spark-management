import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal.js";
import ReactDataGrid from "react-data-grid";
import SortByDropdowns from "../../../pages/AdminPortal/ManageCodesPage/Dropdowns/SortBy/SortBy.js";
import FilterByDropdowns from "../../../pages/AdminPortal/ManageCodesPage/Dropdowns/FilterBy/FilterBy.js";
import "react-data-grid/dist/react-data-grid.css";
import style from "./ButtonHolder.module.css";
import axios from "axios";

function ButtonHolder(props){
  useEffect(() => {
    console.log("props.page value: ", props.page)
    console.log("props.codes length value: ", props.codes.length)
  })
  return (
    <div className={style.buttonHolder}>
    <Modal
      overlayClick={true}
      height="58vh"
      color="#f3e8cb"
      showModal={props.showModal}
      handleCloseModal={props.handleCloseModal}
    >
    <div className={style.dropdownsContainer}>
      <div className={style.sortByTypeDropdownContainer}>
        <SortByDropdowns updateRows={props.updateRows} handleCloseModal={props.handleCloseModal}/>
      </div>
      <div className={style.filterByColumnDropdown}>
        <FilterByDropdowns updateRows={props.updateRows} handleCloseModal={props.handleCloseModal}/>
      </div>
    </div>
    <div className={style.resetFiltersAndSorts}>
      <button onClick={props.resetFiltersAndSorts}>Reset</button>
    </div>
    <div className={style.changePageButtons}>
      <div className={style.buttonHolder}>
        {props.page > 0 && (
          <button className={style.lastPageButton} onClick={props.substractPage}>
            {" Last Page"}
          </button>
        )}
        {props.codes.length === props.NUM_ROWS_PER_PAGE && (

            <button className={style.nextPageButton} onClick={props.addPage}>
              {" Next Page"}
            </button>
        )}
      </div>
    </div>
    </Modal>
    </div>
  )
}

export default ButtonHolder;
