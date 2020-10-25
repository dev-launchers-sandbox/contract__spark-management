import React, {useState, useEffect} from "react";
import style from "./Message.module.css";

function Message(props){
  return(
    <div className={style.messageHolder}>
      <p className={style.message}><b>{props.message.author}</b></p>
      <p className={style.message}>{props.message.content}</p>
    </div>
  )
}


export default Message;
