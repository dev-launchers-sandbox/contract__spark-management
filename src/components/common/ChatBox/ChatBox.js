import React, {useState, useEffect} from "react"
import style from "./ChatBox.module.css";

function ChatBox(props){

  useEffect(() => {
    console.log("chatbox");
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleClose = () => {
    props.handleCallBack(false);
  }

  return(
    <div className={style.container}>
      <div className={style.messageArea}>
        <span className={style.closeToggle} onClick={handleClose}>✖️</span>
      </div>
      <div className={style.textBar}>
        <form className={style.formContainer}>
          <textarea className={style.chatText} placeholder="type something!" />
          <div className={style.buttonHolder}>
            <button className={style.button} onClick={handleSubmit}>send</button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default ChatBox;
