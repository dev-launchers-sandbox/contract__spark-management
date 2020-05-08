import { useState, useEffect } from "react";

export default function useDeck(cardArray) {
  // Add a property to each card, for use in our animation system
  for (let card of cardArray) {
    card.isFlipped = false;
  }

  const [cards, setCards] = useState(cardArray);

  useEffect(() => {
    initDeck();
  }, []);

  const initDeck = () => {
    shuffleCards();
  };

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
