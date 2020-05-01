import { useState, useEffect } from "react";

export default function YellowDeck(Parameter) {
  const [hand, setHand] = useState([]);
  const [cards, setCards] = useState(Parameter);

  useEffect(() => {
    shuffleCards();
    var i;
    for (i = 0; i < 8; i++) {
      drawCard();
    }
  }, []);

  const drawCard = () => {
    const newCard = cards.pop();
    return newCard;
  };
  const resetDecks = () => {
    setCards(Parameter);
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
  };
  return { hand, resetDecks, shuffleCards, drawCard };
}
