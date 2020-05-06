import React, { useState, useEffect } from "react";
import style from "./RedDeck.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

import CopyTextIcon from "./../Icons/CopyTextIcon/CopyTextIcon";
import SelectCardIcon from "./../Icons/SelectCardIcon/SelectCardIcon";
import useDeck from "./../useDeck/useDeck";
import WhiteLogo from "/../../../../public/Images/white-spark-logo.png";
import CommunityDeckRed from "/../../../../public/Data/CommunityDeck/CommunityDeckRed.json";

export default function RedDeck() {
  const [cardShowingBoolean, setCardShowingBoolean] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [cards, setCards] = useState(CommunityDeckRed);
  const { drawCard } = useDeck(CommunityDeckRed);

  function handleClick() {
    if (cardShowingBoolean === false) {
      setCardShowingBoolean(prevState => !prevState);
    }
    setCurrentCard(drawCard().question);
  }
  const shuffleDeck = () => {
    setCards(CommunityDeckRed);
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
    <div className={style.total}>
      {cardShowingBoolean ? (
        <div>
          <div className={style.RedDeck} onClick={handleClick}>
            <h1> {currentCard} </h1>
          </div>
          <CopyTextIcon text={currentCard} />
        </div>
      ) : (
        <div className={style.RedDeck} onClick={handleClick}>
          <img className={style.whiteLogo} src={WhiteLogo} alt="Logo" />
        </div>
      )}
    </div>
  );
}
