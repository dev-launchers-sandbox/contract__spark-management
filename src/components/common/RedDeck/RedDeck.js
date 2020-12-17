import React, { useState } from "react";
import style from "./RedDeck.module.css";
import ReactCardFlip from "react-card-flip";

import SendToChatIcon from "./../Icons/SendToChatIcon/SendToChatIcon";
import SelectCardIcon from "./../Icons/SelectCardIcon/SelectCardIcon";
import useDeck from "./../useDeck/useDeck";
import whiteLogo from "./../../../images/white-spark-logo.png";
import sendEvent from "../../../utils/sendEvent.js";

export default function RedDeck(props) {
  const { drawCard } = useDeck(props.deck); // uses the useDeck
  const [card, setCard] = useState(""); //Card that is being dislplayed
  const [isFlipped, setIsFlipped] = useState(true);

  React.useEffect(() => {
    setCard(drawCard().question);
  }, []);

  function onClick() {
    // when the deck is clicked it checks whether the deck is showing a card or the deck.
    // Depending on the previous condition, it will draw a new Card or not.
    // The card gets always fliped.
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
    // styling for the properties of the cardFlip.
    <div>
      <ReactCardFlip
        containerStyle={{ margin: "1%" }}
        flipSpeedBackToFront="1"
        flipSpeedFrontToBack="1"
        flipDirection="vertical"
        isFlipped={isFlipped}
      >
        <div
          key="front"
          className={style.RedDeck}
          title="do not flip if you're not the sparker"
        >
          {/* the key is what makes the ReactCardFlip package to know which part is the front or back part.*/}
          <div>
            <h1> {card} </h1>
            <SendToChatIcon openChat={props.openChat} text={card} />
            <SelectCardIcon
              onClick={() => {
                onClick();
                sendEvent(
                  "Red Card",
                  "Discard and draw button clicked",
                  "button"
                );
              }}
              isYellowCard={false}
            />
          </div>
        </div>

        <div
          key="back"
          style={{ transformStyle: "initial" }}
          className={style.RedDeck}
          onClick={onClick}
          title="Only flip if you are the SPARKER"
        >
          <img
            className={style.whiteLogo}
            src={process.env.PUBLIC_URL + "/images/white-spark-logo.png"}
            alt="logo"
          />
        </div>
      </ReactCardFlip>
    </div>
  );
}
