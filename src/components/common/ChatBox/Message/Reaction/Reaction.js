import React, { useContext, useEffect } from "react";
import style from "./Reaction.module.css";
import { MessagesContext } from "../../../../../useContext/MessagesProvider";
import socket from "../../../../../utils/socket.js";

function Reaction(props) {
  const { messages, setMessages } = useContext(MessagesContext);


    socket.off('updateReaction');
    socket.on("updateReaction", (data) => {
      console.log("this is the freaking data: ", data);

      /*
      setMessages((msgs) => {
        const newMsgs = messages.concat();
        const getMessageObject = newMsgs.find(message => message.id === data.id);
        const index = newMsgs.indexOf(getMessageObject);
        const msgCopy = { ...getMessageObject };
        const reactionIndex = msgCopy.reactions.indexOf(props.reaction);
        const isChecked = msgCopy.reactions[reactionIndex].isChecked;

        msgCopy.reactions[reactionIndex].isChecked = !isChecked;
        if (isChecked) msgCopy.reactions[reactionIndex].count--;
        else msgCopy.reactions[reactionIndex].count++;

        if (msgCopy.reactions[reactionIndex].count <= 0) {
          msgCopy.reactions.splice(reactionIndex, 1);
        }

        newMsgs.splice(index, 1, msgCopy);
        return newMsgs;
      })
      */
    })


  const handleClick = () => {
    socket.emit("clickedReaction", props.message);
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
