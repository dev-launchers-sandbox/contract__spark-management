import { useState, useEffect } from "react";

export default function useDeck(cardArray) {
  // Add a property to each card, for use in our animation system
  for (let card of cardArray) {
    card.isFlipped = false;
  }

  const [cards, setCards] = useState(cardArray);

  useEffect(() => {
    //when the component first mounts we want it to initialite our useDeck functions.
    initDeck();
  }, []);

  const initDeck = () => {
    // This function will initialize the app.
    shuffleCards();
  };

  const resetCards = () => {
    //TODO: This will put all the cards
    // inside of the deck, and it will shuffle it.
  };

  const drawCard = () => {
    // This returns a new card that has been "popped" from the corresponding deck.
    const newCard = cards.pop();
    return newCard;
  };

  const shuffleCards = () => {
    //this will return a new version of the deck, but shuffled.
    for (let i = 0; i < cards.length * 2; i++) {
      let randIndex = parseInt(Math.random() * cards.length);
      cards.push(cards.splice(randIndex, 1)[0]);
    }

    setCards(cards);
    console.log("cards", cards);
  };
  // creates the useDeck Custom Hook
  return { resetCards, shuffleCards, drawCard };
}
