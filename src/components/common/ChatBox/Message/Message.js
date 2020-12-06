import React, { useState, useEffect, useContext } from "react";
import style from "./Message.module.css";
import EmojiButton from "./EmojiButton/EmojiButton.js";
import Reaction from "./Reaction/Reaction.js";
import { MessagesContext } from "../../../../useContext/MessagesProvider";
import socket from "../../../../utils/socket.js";

function Message(props) {
  const [showButton, setShowButton] = useState(false);
  const { messages, setMessages } = useContext(MessagesContext); //ANNOYING FORMATTER
  const [openDownwards, setOpenDownwards] = useState();
  const messageReactions = () => {
    return props.message.reactions || [];
  };

  //checks which card it comes from
  const comesFromCard = () => {
    if (props.message.content.indexOf("\u200B") != -1) {
      return "redCard";
    } else if (props.message.content.indexOf("\uFEFF") != -1) {
      return "yelloCard";
    } else {
      return false;
    }
  };

  const handleDivClick = (e) => {
    const buttonPos = e.target.getBoundingClientRect().y;
    const fullHeight = props.getFullHeight();
    setOpenDownwards(buttonPos * 2.2 > fullHeight);
  };

  const isEmojiThere = (emoji) => {
    try {
      for (let i = 0; i < props.message.reactions.length; i++) {
        let reaction = props.message.reactions[i];
        if (reaction.emoji === emoji) {
          return true;
        }
      }
      return false;
    } catch (err) {
      console.log("omg there is an error: ", err);
    }
  };

  const addReaction = (message, reaction) => {
    setMessages((msgs) => {
      const newMsgs = msgs.concat();
      const msg = messages.find((m) => m.id === message.id);
      const index = newMsgs.indexOf(msg);
      const newMessage = {
        ...msg,
        reactions: [...msg.reactions, reaction],
      };

      newMsgs.splice(index, 1, newMessage);
      return newMsgs;
    });
  };

  const updateCount = (message, reaction, num, isChecked) => {
    const userMessage = messages.find((msg) => msg.id === message.id);
    if (!userMessage) return;
    const reactionInArray = userMessage.reactions.find(
      (r) => r.emoji === reaction.emoji
    );
    if (!reactionInArray) return;
    const reactionIndex = userMessage.reactions.indexOf(reactionInArray);

    setMessages((msgs) => {
      const messagesClone = messages.concat();
      const msgClone = { ...userMessage };
      const prevCount = msgClone.reactions[reactionIndex].count;

      if (prevCount === 1 && num === -1) {
        msgClone.reactions.splice(reactionIndex, 1);
      } else {
        msgClone.reactions[reactionIndex].isChecked = isChecked;
        msgClone.reactions[reactionIndex].count = prevCount + num;
      }
      const index = messages.indexOf(userMessage);
      messagesClone.splice(index, 1, msgClone);

      return messagesClone;
    });
  };

  socket.off("receiveReaction");

  socket.on("receiveReaction", (message, reaction) => {
    const msg = messages.find((m) => m.id === message.id);
    if (isEmojiThere(reaction.emoji)) {
      if (!msg) return;

      const messageReaction = msg.reactions.find(
        (r) => r.emoji === reaction.emoji
      );
      if (!messageReaction) return;
      updateCount(msg, reaction, 1, messageReaction.isChecked);
    } else {
      addReaction(msg, reaction);
    }
  });

  socket.off("receiveRemoveReaction");

  socket.on("receiveRemoveReaction", (message, reaction) => {
    const clientMessageObject = messages.find((msg) => msg.id === message.id);
    const reactions = clientMessageObject.reactions;
    const msgReaction = reactions.find((r) => r.emoji === reaction.emoji);

    updateCount(message, reaction, -1, msgReaction.isChecked);
  });

  return (
    <div
      className={
        props.message.server ? style.messageHolderServer : style.messageHolder
      }
      onMouseOver={props.message.server ? null : () => setShowButton(true)}
      onMouseLeave={props.message.server ? null : () => setShowButton(false)}
    >
      {!props.message.server && (
        <div className={style.author}>
          <b>{props.message.author} </b>{" "}
          <div className={style.date}> {props.message.timestamp} </div>
          <div
            id="emojipanel"
            onClick={handleDivClick}
            className={style.emojiButton}
          >
            {showButton && (
              <EmojiButton
                message={props.message}
                setShowButton={setShowButton}
                openDownwards={openDownwards}
              />
            )}
          </div>
        </div>
      )}

      <div
        className={
          props.message.server
            ? style.server
            : comesFromCard() === "yelloCard"
            ? style.yellowCardText
            : comesFromCard() === "redCard"
            ? style.redCardText
            : style.content
        }
      >
        {props.message.content}
      </div>
      <div className={style.reactionsContainer}>
        {messageReactions().map((reaction, key) => {
          return (
            <Reaction message={props.message} key={key} reaction={reaction} />
          );
        })}
      </div>
    </div>
  );
}

export default Message;
