import React, { useState, useEffect } from "react";
import Message from "./Message/Message.js";
import style from "./ChatBox.module.css";

function ChatBox(props) {

  const [messageContent, setMessageContent] = useState("");

  const [messages, setMessages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessageContent("");
    sendMessage();
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setMessageContent(value);
  };

  const handleClose = () => {
    props.handleCallBack(false);
  };

  const sendMessage = () => {
    const room = getRoomCode();
    const username = sessionStorage.getItem("username") || "No username"; //just in case
    const message = { content: messageContent, author: username, room: room};
    setMessages([...messages, message]);
  };

  const getRoomCode = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let urlToString = urlParams.toString();
    return urlToString.substr(5);
  };

  return (
    <div className={style.container}>
      <div className={style.messageArea}>
        <span className={style.closeToggle} onClick={handleClose}>
          ✖️
        </span>
        <div className={style.message}>
          {messages.map((message, key) => {
            return (
              <Message key={key} message={message}/>
            )
          })}
        </div>
      </div>
      <div className={style.textBar}>
        <form className={style.formContainer}>
          <textarea
            value={messageContent}
            onChange={handleChange}
            className={style.chatText}
            placeholder="Type something!"
          />
          <div className={style.buttonHolder}>
            <button className={style.button} onClick={handleSubmit}>
              send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
