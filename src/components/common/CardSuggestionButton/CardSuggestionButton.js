import React from "react";
import style from "./CardSuggestionButton.module.css";
import cardIcon from "../../../images/card.png";

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
