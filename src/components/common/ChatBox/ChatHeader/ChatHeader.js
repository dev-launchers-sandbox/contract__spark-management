import React, { useState } from "react";
import style from "./ChatHeader.module.css";

function ChatHeader(props) {
  return (
    <div className={style.chatHeader}>
      <p className={style.room}> Room: {props.room()} </p>
      <span className={style.closeToggle} onClick={props.handleClose}>
        ✖️
      </span>
    </div>
  );
}

export default ChatHeader;
