import React, {useState, useEffect} from "react";
import style from "./Message.module.css";

function Message(props){
  return(
    <div>
      <p className={style.message}><b>{props.message.author}</b>: {props.message.content}</p>
      <div className={style.scroll} />
    </div>
  )
}


export default Message;
