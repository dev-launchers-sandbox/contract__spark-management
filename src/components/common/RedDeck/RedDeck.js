import React, { useState, useEffect } from "react";
import style from "./RedDeck.module.css";

import WhiteLogo from "/../../../../public/Images/white-spark-logo.png";
import RedCardInfo from "/../../../../public/Data/RedCards.json";

export default function RedDeck() {
  const [cardShowingBoolean, setCardShowingBoolean] = useState(false);
  const [number, setNumber] = useState(0);
  const [deck, setDeck] = useState(RedCardInfo);

  function handleClick() {
    setCardShowingBoolean(prevState => !prevState);
    if (number !== 32) {
      setNumber(number + 1);
    } else {
      setNumber(0);
    }
  }
  const shuffleDeck = () => {
    setDeck(RedCardInfo);
    for (let i = 0; i < deck.length * 2; i++) {
      let randIndex = parseInt(Math.random() * deck.length);
      deck.push(deck.splice(randIndex, 1)[0]);
    }
    setDeck(deck);
  };
  useEffect(() => {
    // When the component mounts, we want to shuffle the cards, we also want to draw 8 cards.s
    shuffleDeck();
  }, []);
  return (
    <div onClick={handleClick} className={style.RedDeck}>
      {cardShowingBoolean ? (
        <h1 className={style.question}> {RedCardInfo[number].question} </h1>
      ) : (
        <img className={style.whiteLogo} src={WhiteLogo} alt="Logo" />
      )}
    </div>
  );
}
