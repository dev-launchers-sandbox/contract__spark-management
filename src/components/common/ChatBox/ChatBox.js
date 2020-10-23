import React, {useState, useEffect} from "react"
import style from "./ChatBox.module.css";

function ChatBox(){

  useEffect(() => {
    console.log("chatbox");
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return(
    <div className={style.chatBox}>
      <div className={style.container}>
      <div className={style.textBar}>
        <form className={style.formContainer}>
          <textarea className={style.chatText} placeholder="type something!" />
          <div className={style.buttonHolder}>
            <button className={style.button} onClick={handleSubmit}>send</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}


export default ChatBox;
