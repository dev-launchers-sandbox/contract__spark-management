import React, { useState } from "react";
import style from "./FilterBy.module.css";

export default function FilterBy() {
  const [filterBy, setFilterBy] = useState({ column: "_id", input: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterBy({
      ...filterBy,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    let filter = `&filter=`; // No docs
  };
  return (
    <div className={style.filterBy}>
      <p> Filter By </p>
      <div className={style.filterByColumnDropdown}>
        <select name="column" value={filterBy.column} onChange={handleChange}>
          <option value="_id"> Code </option>
          <option value="client_name"> Client </option>
          <option value="deck_name"> Deck </option>
          <option value="user_creator_name"> Created By </option>
          <option value="createdAt"> Created At </option>
          <option value="expiration_date"> Exp. Date </option>
        </select>
      </div>
      <div className={style.inputBox}>
        <input
          type="text"
          name="input"
          value={filterBy.input}
          onChange={handleChange}
        />
      </div>
      <div className={style.applyFilter}>
        <button onClick={handleSubmit} className={style.button}> Appy Filter </button>
      </div>
    </div>
  );
}
