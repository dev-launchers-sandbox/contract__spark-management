import React, { useState, useEffect, useContext } from "react";
import style from "./Message.module.css";
import EmojiButton from "./EmojiButton/EmojiButton.js";
import Reaction from "./Reaction/Reaction.js";
import { MessagesContext } from "../../../../useContext/MessagesProvider";

function Message(props) {
  const [showButton, setShowButton] = useState(false);
  const { messages, setMessages } = useContext(MessagesContext); //ANNOYING FORMATTER

  const getMessageObject = () => {
    return messages.find((message) => message.id === props.message.id);
  };

  const messageReactions = () => {
    return props.message.reactions || [];
  };

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
          <div className={style.emojiButton}>
            {showButton && (
              <EmojiButton
                message={props.message}
                getMessageObject={getMessageObject}
              />
            )}
          </div>
        </div>
      )}

      <div className={props.message.server ? style.server : style.content}>
        {props.message.content}
        <div className={style.reactionsContainer}>
          {messageReactions().map((reaction, key) => {
            return (
              <Reaction
                key={key}
                emoji={reaction.emoji}
                count={reaction.count}
                isChecked={reaction.isChecked}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Message;
