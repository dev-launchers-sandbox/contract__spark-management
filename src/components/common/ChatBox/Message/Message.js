import React, { useState, useEffect, useContext } from "react";
import style from "./Message.module.css";
import EmojiButton from "./EmojiButton/EmojiButton.js";
import Reaction from "./Reaction/Reaction.js";
import { MessagesContext } from "../../../../useContext/MessagesProvider";
import socket from "../../../../utils/socket.js";

function Message(props) {
  const [showButton, setShowButton] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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

  const handleCallBack = (isEmojiPickerOpen) => {
    setShowEmojiPicker(isEmojiPickerOpen);
  };
  const getDate = (unixTime) => {
    const date = new Date(unixTime);
    let hours = date.getHours();
    let amOrPm = "AM";
    if (hours > 12) {
      hours -= 12;
      amOrPm = "PM";
    }

    let minutes = date.getMinutes();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return hours + ":" + minutes + ` ${amOrPm}`;
  };

  return (
    <div
      className={
        props.message.server ? style.messageHolderServer : style.messageHolder
      }
      onMouseOver={props.message.server ? null : () => setShowButton(true)}
      onMouseLeave={
        showEmojiPicker
          ? null
          : props.message.server
          ? null
          : () => setShowButton(false)
      }
    >
      {!props.message.server && (
        <div className={style.author}>
          <b>{props.message.author} </b>{" "}
          <div className={style.date}> {getDate(props.message.timestamp)} </div>
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
                handleCallBack={handleCallBack}
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
