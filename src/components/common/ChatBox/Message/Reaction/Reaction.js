import React, { useContext } from "react";
import style from "./Reaction.module.css";
import { MessagesContext } from "../../../../../useContext/MessagesProvider";

function Reaction(props) {
  const { messages, setMessages } = useContext(MessagesContext);

  const handleClick = () => {
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
