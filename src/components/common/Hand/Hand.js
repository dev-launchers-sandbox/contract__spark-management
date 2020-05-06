import React, { useState, useEffect } from "react";
import style from "./Hand.module.css";

import ResetDecksButton from "./ResetDecksButton/ResetDecksButton";
import useDeck from "./../useDeck/useDeck";
import YellowCard from "./../YellowCard/YellowCard";
import YellowCardInfo from "/../../../../public/Data/YellowCards.json";
import DiscardHandButton from "./DiscardHandButton/DiscardHandButton";
const NUM_CARDS_IN_HAND = 8;

export default function Hand(props) {
  const [cards, setCards] = useState([]);

  const { resetDecks, shuffleCards, drawCard } = useDeck(YellowCardInfo);

  // populateHand() : Draws NUM_CARDS_IN_HAND cards into the hand
  const populateCards = () => {
    let newHand = [];
    for (let i = 0; i < NUM_CARDS_IN_HAND; i++) {
      newHand.push(drawCard());
    }
    setCards(newHand);
  };

  // disardHand() : Discards all cards from the hand
  const discardCards = () => {
    console.log("it run");
    setCards([]);
  };

  // discardCardAndDraw() : Discards the supplied card and replaces it with a new one
  const discardCardAndDraw = card => {
    // Remove card from the hand
    let cardCopy = [...cards];
    const index = cardCopy.indexOf(card);

    // remove card atT found index, and replace with a new card
    cardCopy.splice(index, 1, drawCard());

    // Add new card to the hand and set to state
    setCards([...cardCopy]);
  };

  // When this Hand component mounts:
  //    Draw cards
  useEffect(() => {
    populateCards();
  }, []);

  return (
    <div>
      <div className={style.Hand}>
        {cards.map(card => {
          console.log("in map", cards);
          return (
            <YellowCard
              answer={card.answer}
              onClick={() => {
                discardCardAndDraw(card);
              }}
              key={card.answer} // Stops React unique key error
            />
          );
        })}
      </div>
      <div className={style.buttonHolder}>
        <ResetDecksButton />
        <DiscardHandButton
          populateCards={populateCards}
          discardCards={discardCards}
        />
      </div>
    </div>
  );
}
