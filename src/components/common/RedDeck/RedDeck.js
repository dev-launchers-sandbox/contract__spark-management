import React, { useState } from "react";
import style from "./RedDeck.module.css";
import ReactCardFlip from "react-card-flip";

import CopyTextIcon from "./../Icons/CopyTextIcon/CopyTextIcon";
import SelectCardIcon from "./../Icons/SelectCardIcon/SelectCardIcon";
import useDeck from "./../useDeck/useDeck";
import WhiteLogo from "/../../../../public/Images/white-spark-logo.png";

export default function RedDeck(props) {
  const { drawCard } = useDeck(props.deck);
  const [card, setCard] = useState(drawCard().question); //Card that is being dislplayed
  const [isFlipped, setIsFlipped] = useState(true);

  function onClick() {
    if (isFlipped) {
      setIsFlipped(false);
    } else {
      setIsFlipped(true);
      setTimeout(() => {
        setCard(drawCard().question);
      }, 500);
    }
  }
  return (
    <ReactCardFlip
      containerStyle={{ margin: "1%" }}
      flipSpeedBackToFront="1"
      flipSpeedFrontToBack="1"
      flipDirection="vertical"
      isFlipped={isFlipped}
    >
      <div key="front" className={style.RedDeck}>
        <div>
          <h1> {card} </h1>
          <CopyTextIcon text={card} />
          <SelectCardIcon onClick={onClick} />
        </div>
      </div>

      <div
        key="back"
        style={{ transformStyle: "initial" }}
        className={style.RedDeck}
        onClick={onClick}
      >
        <img className={style.whiteLogo} src={WhiteLogo} alt="logo" />
      </div>
    </ReactCardFlip>
  );
}
