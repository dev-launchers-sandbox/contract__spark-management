import React, {useState, useEffect} from "react";
import style from "./Message.module.css";

function Message(props){
  return(
    <div className={style.messageHolder}>
      <div className={style.author}><b>{props.message.author}:</b></div>
      <div className={style.content}>{props.message.content}</div>
    </div>
  )
}


export default Message;
