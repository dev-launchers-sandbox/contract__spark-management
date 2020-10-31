import React, { useState, useEffect } from "react";
import style from "./Message.module.css";
import EmojiButton from "../EmojiButton/EmojiButton.js";

function Message(props) {

  const [showButton, setShowButton] = useState(false);
  /*
  const imageExists = (image_url) => {
    try {
      var http = new XMLHttpRequest();

      http.open("HEAD", image_url, false);
      http.send();

      return http.status != 404;
    } catch (error) {
      console.log("No load");
      return false;
    }
  };
  */

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
