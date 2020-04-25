import React, { useState, useEffect } from "react";

import YellowCardInfo from "/../../../../public/Data/YellowCards.json";

export default function YellowDeck() {
  const [cards, setCards] = useState(YellowCardInfo);

  useEffect(() => {
    // When the component mounts, we want to shuffle the cards.
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    for (let i = 0; i < cards.length * 2; i++) {
      let randIndex = parseInt(Math.random() * cards.length);
      cards.push(cards.splice(randIndex, 1)[0]);
    }
    setCards(cards);
  };
  return null;
}
