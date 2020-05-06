import React, { useState, useEffect } from "react";
import style from "./RedDeck.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useDeck from "./../useDeck/useDeck";
import WhiteLogo from "/../../../../public/Images/white-spark-logo.png";
import RedCardInfo from "/../../../../public/Data/RedCards.json";
toast.configure();
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
  const notify = () => {
    toast("Text Copied to Clipboard!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500
    });
  };
  const image =
    "https://storage.needpix.com/rsynced_images/clipboard-1719736_1280.png";
  return (
    <div className={style.total}>
      {cardShowingBoolean ? (
        <div>
          <div className={style.RedDeck} onClick={handleClick}>
            <h1 className={style.question}> {currentCard} </h1>
          </div>
          <CopyToClipboard text="example">
            <img
              onClick={notify}
              className={style.CopyToClipboardImage}
              src={image}
              alt="copy"
            />
          </CopyToClipboard>
        </div>
      ) : (
        <div className={style.RedDeck} onClick={handleClick}>
          <img className={style.whiteLogo} src={WhiteLogo} alt="Logo" />
        </div>
      )}
    </div>
  );
}
