import React, { useState, useEffect, useContext } from "react";
import style from "./Hand.module.css";
import { BrowserRouter as Router, Redirect, useParams } from "react-router-dom";
import useDeck from "./../useDeck/useDeck";
import YellowCard from "./../YellowCard/YellowCard";
import DiscardHandButton from "./DiscardHandButton/DiscardHandButton";
import HowToPlayButton from "./HowToPlayButton/HowToPlayButton";
import NeedHelpButton from "./NeedHelpButton/NeedHelpButton";
import CardSuggestionButton from "./CardSuggestionButton/CardSuggestionButton.js"
import queryString from "query-string";
import { MessagesContext } from "../../../useContext/MessagesProvider";

import sendEvent from "../../../utils/sendEvent.js";
import getRoomCode from "../../../utils/getRoomCode";
import socket from "../../../utils/socket";

const NUM_CARDS_IN_HAND = 8;
let initialFlipStates = [];
for (let i = 0; i < NUM_CARDS_IN_HAND; i++) initialFlipStates.push(false);

export default function Hand(props) {
  const { messages, setMessages } = useContext(MessagesContext);
  const { drawCard } = useDeck(props.deck); //Custom hook
  //const { addReaction, updateCount } = useReactions(MessagesContext);

  const [cards, setCards] = useState([]); //Cards holds all of the cards that the hand is displaying
  const [flipStates, setFlipStates] = useState(initialFlipStates);
  const [code, setCode] = useState("None");
  const [redirect, setRedirect] = useState(false);

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

  useEffect(() => {
    const room = getRoomCode();
    socket.emit("room", room);
  }, []);

  socket.on("receiveMessage", (data) => {
    addMessage(data);
  });

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

  const addMessage = (data) => {
    setMessages([...messages, data]);
  };

  const sendWelcomeMessage = () => {
    const username = sessionStorage.getItem("username");

    let user = {
      username: username,
      room: getRoomCode(),
    };

    socket.emit("userJoined", user);
    let message = {
      content: "You joined the room",
      author: "",
      room: getRoomCode(),
      server: true,
    };
    addMessage(message);
  };

  socket.on("receiveUserJoined", (user) => {
    const message = {
      content: `${user.username} joined the room`,
      author: "",
      room: user.room,
      server: true,
    };
    addMessage(message);
  });

  socket.on("receiveUserLeft", (user) => {
    const message = {
      content: `${user.username} left the room`,
      author: "",
      room: user.room,
      server: true,
    };
    addMessage(message);
  });

  // When this Hand component mounts:
  //    Draw cards
  useEffect(() => {
    sendWelcomeMessage();
    let query = window.location.search;
    try {
      const queryParsed = queryString.parse(query);
      setCode(queryParsed.code);
    } catch (error) {
    } finally {
      hideAllCards();
      populateCards();
    }
  }, []);

  useEffect(() => {
    const user = {
      room: getRoomCode(),
      username: sessionStorage.getItem("username"),
    };
    return () => {
      socket.emit("userLeft", user);
    };
  }, []);

  window.onbeforeunload = confirmExit;
  function confirmExit() {
    const user = {
      room: getRoomCode(),
      username: sessionStorage.getItem("username"),
    };

    socket.emit("userLeft", user);
  }

  useEffect(() => {
    if (code === "None") return;
    if (!sessionStorage.getItem(code)) setRedirect(true);
  }, [code]);

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
                console.log("yellow card button has been pressed");
                sendEvent(
                  "Yellow Card",
                  "Discards and draw button clicked",
                  "button"
                );
                discardCardAndDraw(card);
              }}
              isEmoji={card.isEmoji}
              key={card.answer} // Stops React unique key error
              emoji={card.emoji || null}
              openChat={props.openChat}
            />
          );
        })}
      </div>
      <div className={style.buttonHolder}>
        <div className={style.cardSuggestionContainer}>
          <CardSuggestionButton />
        </div>
        <div className={style.multipleButtons}>
          <HowToPlayButton />
          <DiscardHandButton
            populateCards={populateCards}
            discardCards={discardCards}
          />
          <NeedHelpButton />
        </div>
        <div className={style.emptyContainer} />
      </div>
      {/* Checks if the code has been verified*/}
      {redirect && <Redirect to="/" />}
    </div>
  );
}
//
