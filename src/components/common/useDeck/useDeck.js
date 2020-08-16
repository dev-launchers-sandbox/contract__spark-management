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
    // This returns a new card that has been "popped" from the corresponding deck
    // TODO:
    let temp = [...cards];
    let toReturn = temp.pop();
    setCards(temp);
    console.log("cardArray", cardArray);
    console.log("cards", cards);
    return toReturn;
  };

  const shuffleCards = () => {
    //this will return a new version of the deck, but shuffled.
    shuffle(cards);
    setCards(cards);
  };
  // creates the useDeck Custom Hook
  return { resetCards, shuffleCards, drawCard };
}

// Fisher-Yates shuffling algorithm (called in shuffleCards())
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
