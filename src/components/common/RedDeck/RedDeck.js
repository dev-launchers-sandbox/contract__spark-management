import React, { useState } from "react";
import style from "./RedDeck.module.css";

import WhiteLogo from "/../../../../public/Images/white-spark-logo.png";
import RedCardInfo from "/../../../../public/Data/RedCards.json";

export default function RedDeck() {
  const [cardShowingBoolean, setCardShowingBoolean] = useState(false);
  const [number, setNumber] = useState(0);

  function handleClick() {
    setCardShowingBoolean(prevState => !prevState);
    setNumber(Math.floor(Math.random() * RedCardInfo.length + 0));
  }

  return (
    <div onClick={handleClick} className={style.RedDeck}>
      {cardShowingBoolean ? (
        <h1 className={style.question}> {RedCardInfo[number].question} </h1>
      ) : (
        <img src={WhiteLogo} alt="Logo" />
      )}
    </div>
  );
}
