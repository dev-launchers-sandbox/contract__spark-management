import React, { useState, useEffect } from "react";
import style from "./Message.module.css";
import EmojiButton from "../EmojiButton/EmojiButton.js";

function Message(props) {

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    console.log(props.message.id);
  }, []);

  return (
    <div
      className={props.message.server ? style.messageHolderServer : style.messageHolder}
      onMouseOver={props.message.server ? null : () => setShowButton(true)}
      onMouseLeave={props.message.server ? null : () => setShowButton(false)}
    >
      {!props.message.server && (
        <div className={style.author}>
          <b>{props.message.author} </b>{" "}
          <div className={style.date}> {props.message.timestamp} </div>
          <div className={style.emojiButton}>
            {showButton && <EmojiButton />}
          </div>
        </div>
      )}

      <div
        className={props.message.server ? style.server : style.content}
      >
        {props.message.content}
      </div>
    </div>
  );
}

export default Message;
