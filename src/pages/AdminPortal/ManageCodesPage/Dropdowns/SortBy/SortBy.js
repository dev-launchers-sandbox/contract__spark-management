import React, { useState } from "react";
import style from "./SortBy.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";

export default function SortBy(props) {
  const [sortBy, setSortBy] = useState({ column: "client_name", type: "+" });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSortBy({
      ...sortBy,
      [name]: value,
    });
  };

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

  const applySort = () => {
    let sort = `&sort=${sortBy.type}${sortBy.column}`;
    props.updateRows(sort);
    props.resetPage();
    props.handleCloseModal();
    notify("Applied!");
  };
  return (
    <div className={style.sortBy}>
      <div className={style.sortByColumnContainer}>
        <label className={style.label}> Sort By: </label>
        <div className={style.sortByColumnDropdown}>
          <select name="column" value={sortBy.column} onChange={handleChange}>
            <option value="client_name"> Client </option>
            <option value="_id"> Code </option>
            <option value="deck_name"> Deck </option>
            <option value="user_creator_name"> Created By </option>
            <option value="createdAt"> Created At </option>
            <option value="expiration_date"> Exp. Date </option>
          </select>
        </div>
      </div>
      <div className={style.sortByTypeContainer}>
        <label className={style.label}> Type: </label>
        <div className={style.sortByTypeDropdown}>
          <select name="type" value={sortBy.type} onChange={handleChange}>
            <option value="+"> +Ascending </option>
            <option value="-"> -Descending </option>
          </select>
        </div>
      </div>
      <div className={style.buttonHolder}>
        <button onClick={applySort} className={style.button}>
          {" "}
          Apply{" "}
        </button>
      </div>
    </div>
  );
}
