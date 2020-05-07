import { useState, useEffect } from "react";

export default function useDeck(Parameter) {
  const [cards, setCards] = useState(Parameter);

  useEffect(() => {
    shuffleCards();
  }, []);

  const resetCards = () => {
    //TODO: This will put all the cards
    // inside of the deck, and it will shuffle it.
  };
  const drawCard = () => {
    const newCard = cards.pop();
    return newCard;
  };
  const shuffleCards = () => {
    for (let i = 0; i < cards.length * 2; i++) {
      let randIndex = parseInt(Math.random() * cards.length);
      cards.push(cards.splice(randIndex, 1)[0]);
    }
    setCards(cards);
    console.log("cards", cards);
  };
  return { resetCards, shuffleCards, drawCard };
}
