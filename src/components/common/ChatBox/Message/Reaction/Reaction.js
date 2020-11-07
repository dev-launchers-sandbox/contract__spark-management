import React, { useContext, useEffect } from "react";
import style from "./Reaction.module.css";

import { MessagesContext } from "../../../../../useContext/MessagesProvider";

import socket from "../../../../../utils/socket.js";
import getRoomCode from "../../../../../utils/getRoomCode";

function Reaction(props) {
  const { messages, setMessages } = useContext(MessagesContext);

  const handleClick = () => {
    //If the reaction is not checked we want to add it.
    if (!props.reaction.isChecked) {
      socket.emit("addReaction", props.message, props.reaction);
    } else {
      socket.emit("removeReaction", props.message, props.reaction);
    }

    setMessages((msgs) => {
      const newMsgs = messages.concat();
      const index = messages.indexOf(props.message);
      const msgCopy = { ...props.message };
      const reactionIndex = msgCopy.reactions.indexOf(props.reaction);
      const isChecked = props.message.reactions[reactionIndex].isChecked;

      msgCopy.reactions[reactionIndex].isChecked = !isChecked;
      if (isChecked) msgCopy.reactions[reactionIndex].count--;
      else msgCopy.reactions[reactionIndex].count++;

      if (msgCopy.reactions[reactionIndex].count <= 0) {
        msgCopy.reactions.splice(reactionIndex, 1);
      }

      newMsgs.splice(index, 1, msgCopy);
      return newMsgs;
    });
  };

  return (
    <div
      style={{
        backgroundColor: props.reaction.isChecked ? "#94afeb" : "#d1c9c9",
      }}
      className={style.reaction}
      onClick={handleClick}
    >
      <p>
        {" "}
        {props.reaction.emoji} {props.reaction.count}
      </p>
    </div>
  );
}

export default Reaction;
