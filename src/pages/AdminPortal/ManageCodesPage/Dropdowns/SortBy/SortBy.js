import React, { useState } from "react";
import style from "./SortBy.module.css";

export default function SortBy() {
  const [sortBy, setSortBy] = useState({ column: "Code", type: "Ascending" });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSortBy({
      ...sortBy,
      [name]: value,
    });
  };
  const applySort = () => {};
  return (
    <div className={style.sortBy}>
      <div className={style.sortByColumnContainer}>
        <p> Sort By: </p>
        <div className={style.sortByColumnDropdown}>
          <select name="column" value={sortBy.column} onChange={handleChange}>
            <option value="Code"> Code </option>
            <option value="Client"> Client </option>
            <option value="Deck"> Deck </option>
            <option value="Created By"> Created By </option>
            <option value="Created At"> Created At </option>
            <option value="Exp. Date"> Exp. Date </option>
          </select>
        </div>
      </div>
      <div className={style.sortByTypeContainer}>
        <p> Type: </p>
        <div className={style.sortByTypeDropdown}>
          <select name="type" value={sortBy.type} onChange={handleChange}>
            <option value="Ascending"> +Ascending </option>
            <option value="Descending"> -Descending </option>
          </select>
        </div>
      </div>
      <button onClick={applySort} className={style.button}>
        {" "}
        Apply{" "}
      </button>
    </div>
  );
}
