import React, { useState, useEffect } from "react";

import YellowCardInfo from "/../../../../public/Data/YellowCards.json";

export default function YellowDeck() {
  const [cards, setCards] = useState(YellowCardInfo);
  useEffect(() => {
    console.log(YellowCardInfo);
    shuffleCards();
    // When the component mounts, we want to shuffle the cards, we also want to draw 8 cards.s
    drawCard();
  }, []);

  const drawCard = () => {
    const newCard = cards.pop();
    console.log(newCard);
    console.log(cards);
    return newCard;

    //this returns the constant newCard which equals cards.pop,
    // which pulls out the last card of the shuffled deck, which is being returned
  };
  const resetDecks = () => {
    setCards(YellowCardInfo);
    for (let i = 0; i < cards.length * 2; i++) {
      let randIndex = parseInt(Math.random() * cards.length);
      cards.push(cards.splice(randIndex, 1)[0]);
    }
    setCards(cards);
  };
  const shuffleCards = () => {
    for (let i = 0; i < cards.length * 2; i++) {
      let randIndex = parseInt(Math.random() * cards.length);
      cards.push(cards.splice(randIndex, 1)[0]);
    }
    setCards(cards);
    console.log(cards);
  };
  return { resetDecks, shuffleCards, drawCard };
}
