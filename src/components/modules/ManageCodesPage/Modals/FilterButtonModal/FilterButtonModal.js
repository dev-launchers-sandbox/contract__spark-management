import React, { useState, useEffect } from "react";
import Modal from "../../../../../components/common/Modal/Modal.js";
import ReactDataGrid from "react-data-grid";
import SortByDropdowns from "../../../../../components/modules/ManageCodesPage/Dropdowns/SortBy/SortBy.js";
import FilterByDropdowns from "../../../../../components/modules/ManageCodesPage/Dropdowns/FilterBy/FilterBy.js";
import "react-data-grid/dist/react-data-grid.css";
import style from "./FilterButtonModal.module.css";
import axios from "axios";

function FilterButtonModal(props) {
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
            <FilterByDropdowns
              updateRows={props.updateRows}
              handleCloseModal={props.handleCloseModal}
              resetPage={props.resetPage}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FilterButtonModal;
