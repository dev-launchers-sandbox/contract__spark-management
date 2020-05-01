import React, { useState, useEffect } from "react";
import style from "./RedDeck.module.css";

import useDeck from "./../useDeck/useDeck";
import WhiteLogo from "/../../../../public/Images/white-spark-logo.png";
import RedCardInfo from "/../../../../public/Data/RedCards.json";

export default function RedDeck() {
  const [cardShowingBoolean, setCardShowingBoolean] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [cards, setCards] = useState(RedCardInfo);
  const { drawCard } = useDeck(RedCardInfo);

  function handleClick() {
    if (cardShowingBoolean === false) {
      setCardShowingBoolean(prevState => !prevState);
    }
    setCurrentCard(drawCard().question);
  }
  const shuffleDeck = () => {
    setCards(RedCardInfo);
    for (let i = 0; i < cards.length * 2; i++) {
      let randIndex = parseInt(Math.random() * cards.length);
      cards.push(cards.splice(randIndex, 1)[0]);
    }
    setCards(cards);
  };
  useEffect(() => {
    // When the component mounts, we want to shuffle the cards, we also want to draw 8 cards.s
    shuffleDeck();
  }, []);
  return (
    <div onClick={handleClick} className={style.RedDeck}>
      {cardShowingBoolean ? (
        <h1 className={style.question}> {currentCard} </h1>
      ) : (
        <img className={style.whiteLogo} src={WhiteLogo} alt="Logo" />
      )}
    </div>
  );
}
