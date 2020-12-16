import React from "react";
import style from "./CardSuggestionButton.module.css";

function CardSuggestionButton() {
  return (
    <div className={style.buttonContainer}>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSfBpV0Tf1YbEnX5mP940D3mTFiFI91bMs3AF5pAoibaiqduvw/viewform?usp=sf_link">
        <button className={style.cardSuggestionButton}>
          {" "}
          Have a suggestion? Click here!
        </button>
      </a>
    </div>
  );
}

export default CardSuggestionButton;
