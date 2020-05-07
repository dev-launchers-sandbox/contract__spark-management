import React, { useState, useEffect } from "react";
import style from "./RedDeck.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

import CopyTextIcon from "./../Icons/CopyTextIcon/CopyTextIcon";
import SelectCardIcon from "./../Icons/SelectCardIcon/SelectCardIcon";
import useDeck from "./../useDeck/useDeck";
import WhiteLogo from "/../../../../public/Images/white-spark-logo.png";
import CommunityDeckRed from "/../../../../public/Data/CommunityDeck/CommunityDeckRed.json";

export default function RedDeck(props) {
  const { drawCard } = useDeck(props.deck);
  const [cardShowingBoolean, setCardShowingBoolean] = useState(false);
  const [card, setCard] = useState(); //Card that is being dislplayed
  const [showingLogoBoolean, setShowingLogoBoolean] = useState(false);

  function onClick() {
    if (cardShowingBoolean === false) {
      setCardShowingBoolean(prevState => !prevState);
    }
    setCard(drawCard().question);
  }
  return (
    <div className={style.RedDeck}>
      {cardShowingBoolean ? (
        <div>
          <h1> {card} </h1>
          <CopyTextIcon text={card} />
          {!showingLogoBoolean && <SelectCardIcon onClick={onClick} />}
        </div>
      ) : (
        <div className={style.deckLogoArea} onClick={onClick}>
          <img className={style.whiteLogo} src={WhiteLogo} alt="Logo" />
        </div>
      )}
    </div>
  );
}
