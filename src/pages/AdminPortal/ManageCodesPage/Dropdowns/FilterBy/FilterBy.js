import React, { useState } from "react";
import style from "./FilterBy.module.css";

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
export default function FilterBy(props) {
  const [filterBy, setFilterBy] = useState({ column: "client_name", input: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterBy({
      ...filterBy,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!filterBy.input) return notify("You must type something in");
    let input = filterBy.input.split(" ").join("%20");
    let filter = `&${filterBy.column}=${input}`;
    props.updateRows(filter);
    notify("Applied!");
    props.resetPage();
    props.handleCloseModal();
  };
  return (
    <div className={style.filterBy}>
      <p> Filter By </p>
      <div className={style.filterByColumnDropdown}>
        <select name="column" value={filterBy.column} onChange={handleChange}>
          <option value="client_name"> Client </option>
          <option value="_id"> Code </option>
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
          style={{ width: "11.9vw" }}
          onChange={handleChange}
          placeholder="add necessary data here"
        />
      </div>
      <div className={style.applyFilter}>
        <button className={style.button} onClick={handleSubmit}>
          {" "}
          Apply Filter{" "}
        </button>
      </div>
    </div>
  );
}
