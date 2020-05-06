import React from "react";
import style from "./DiscardHandButton.module.css";

export default function DiscardHandButton(props) {
  const handleClick = () => {
    props.discardCards();
    props.populateCards();
  };
  return (
    <div>
      <button onClick={handleClick} className={style.discardHandButton}>
        {" "}
        Discard Hand{" "}
      </button>
    </div>
  );
}
