import React from "react";
import style from "./CardSuggestionButton.module.css";

function CardSuggestionButton() {
  return (
    <div className={style.buttonContainer}>
      <button className={style.cardSuggestionButton}>
        {" "}
        Have a suggestion? Click here!
      </button>
    </div>
  );
}

export default CardSuggestionButton;
