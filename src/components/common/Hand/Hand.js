import React, { useState, useEffect } from "react";
import style from "./Hand.module.css";
import { BrowserRouter as Router, Redirect, useParams } from "react-router-dom";
import useDeck from "./../useDeck/useDeck";
import YellowCard from "./../YellowCard/YellowCard";
import DiscardHandButton from "./DiscardHandButton/DiscardHandButton";
import HelpButton from "../HelpButton/HelpButton.js";
import LinkHolderCard from "../LinkHolderCard/LinkHolderCard";
const NUM_CARDS_IN_HAND = 8;
let initialFlipStates = [];
for (let i = 0; i < NUM_CARDS_IN_HAND; i++) initialFlipStates.push(false);

export default function Hand(props) {
  let { code } = useParams();
  const { drawCard } = useDeck(props.deck); //Custom hook
  const [cards, setCards] = useState([]); //Cards holds all of the cards that the hand is displaying
  const [flipStates, setFlipStates] = useState(initialFlipStates);

  // populateHand() : Draws NUM_CARDS_IN_HAND cards into the hand
  const populateCards = () => {
    let newHand = [];
    for (let i = 0; i < NUM_CARDS_IN_HAND; i++) {
      newHand.push(drawCard());
    }
    setCards(newHand);
    setTimeout(() => {
      revealAllCards();
    }, 1000);
  };

  // disardHand() : Discards all cards from the hand
  const discardCards = () => {
    hideAllCards();
    setTimeout(() => {
      setCards([]);
      populateCards();
    }, 1000);
  };
  // flipCard() : It flips the card.
  const flipCard = (cardIndex, flipState) => {
    let flipStatesCopy = [...flipStates];
    flipStatesCopy[cardIndex] = flipState;

    // Add new card to the hand and set to state
    setFlipStates([...flipStatesCopy]);
  };
  //  hideAllCards(): Hides all of the cards by fliping them.
  const hideAllCards = () => {
    let hiddenFlipStates = [];
    for (let i = 0; i < NUM_CARDS_IN_HAND; i++) hiddenFlipStates.push(true);
    setFlipStates(hiddenFlipStates);
  };
  // revealAllCards(): Reveals all cards by fliping them.
  const revealAllCards = () => {
    setFlipStates(initialFlipStates);
  };

  // discardCardAndDraw() : Discards the supplied card and replaces it with a new one
  const discardCardAndDraw = (card) => {
    // Remove card from the hand
    let cardsCopy = [...cards];
    const index = cardsCopy.indexOf(card);

    flipCard(index, true);
    setTimeout(() => {
      let newCard = drawCard();
      cardsCopy[index].answer = newCard.answer;
      cardsCopy[index].isEmoji = newCard.isEmoji;

      // Add new card to the hand and set to state
      setCards([...cardsCopy]);
      setTimeout(() => {
        revealAllCards();
      }, 500);
    }, 750);
  };

  // When this Hand component mounts:
  //    Draw cards
  useEffect(() => {
    hideAllCards();
    populateCards();
  }, []);

  return (
    <div>
      <div className={style.Hand}>
        {cards.map((card, index) => {
          return (
            <YellowCard
              isFlipped={flipStates[index]}
              answer={card.answer}
              onClick={() => {
                //flipCard(card);
                discardCardAndDraw(card);
              }}
              emoji={card.isEmoji}
              key={card.answer} // Stops React unique key error
            />
          );
        })}
        <LinkHolderCard />
      </div>
      <div className={style.buttonHolder}>
        <DiscardHandButton
          populateCards={populateCards}
          discardCards={discardCards}
        />
      </div>
      {/* Checks if the code has been verified*/}
      {sessionStorage.getItem(code) === null && <Redirect to="/" />}
    </div>
  );
}
//<HelpButton />
