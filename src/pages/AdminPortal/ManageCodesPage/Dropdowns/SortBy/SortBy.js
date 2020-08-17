import React, { useState } from "react";
import style from "./SortBy.module.css";

export default function SortBy(props) {
  const [sortBy, setSortBy] = useState({ column: "_id", type: "+" });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSortBy({
      ...sortBy,
      [name]: value,
    });
  };
  const applySort = () => {
    let sort = `&sort=${sortBy.type}${sortBy.column}`;
    props.updateRows(sort);
  };
  return (
    <div className={style.sortBy}>
      <div className={style.sortByColumnContainer}>
        <p> Sort By: </p>
        <div className={style.sortByColumnDropdown}>
          <select name="column" value={sortBy.column} onChange={handleChange}>
            <option value="_id"> Code </option>
            <option value="client_name"> Client </option>
            <option value="deck_name"> Deck </option>
            <option value="user_creator_name"> Created By </option>
            <option value="createdAt"> Created At </option>
            <option value="expiration_date"> Exp. Date </option>
          </select>
        </div>
      </div>
      <div className={style.sortByTypeContainer}>
        <p> Type: </p>
        <div className={style.sortByTypeDropdown}>
          <select name="type" value={sortBy.type} onChange={handleChange}>
            <option value="+"> +Ascending </option>
            <option value="-"> -Descending </option>
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
