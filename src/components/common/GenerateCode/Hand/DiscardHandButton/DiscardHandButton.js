import React from "react";
import style from "./DiscardHandButton.module.css";

export default function DiscardHandButton(props) {
  // handleClick(): Calls the function that discards the entire hand.
  const handleClick = () => {
    props.discardCards();
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
