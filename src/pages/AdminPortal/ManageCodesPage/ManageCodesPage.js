import React, { useState } from "react";
import style from "./ManageCodesPage.module.css";

import MockAdapter from "axios-mock-adapter";
import Header from "../../../components/common/Header/Header";
import DataGridComponent from "../../../components/common/DataGrid/DataGrid";
import SortByDropdowns from "./Dropdowns/SortBy/SortBy";

function ManageCodesPage() {
  return (
    <div>
      <div className={style.manageCodesPage}>
        <Header />
        <div className={style.buttonContainer}>
          <button>+Code </button>
          <button>+Client </button>
        </div>
      </div>
      <DataGridComponent />
      <div className={style.dropdownsContainer}>
        <SortByDropdowns />
      </div>
    </div>
  );
}

export default ManageCodesPage;
