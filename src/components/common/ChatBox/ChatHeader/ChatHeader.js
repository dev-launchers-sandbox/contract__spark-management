import React, { useState, useEffect} from "react";
import style from "./ChatHeader.module.css";
import axios from "axios";

function ChatHeader(props) {

  return (
    <div className={style.chatHeader}>
      <p className={style.room}>Spark a conversation</p>
      <span className={style.closeToggle} onClick={props.handleClose}>
        ✖️
      </span>
    </div>
  );
}

export default ChatHeader;
