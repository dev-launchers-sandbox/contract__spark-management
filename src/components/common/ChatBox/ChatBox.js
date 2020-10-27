import React, { useState, useEffect, useRef, useContext } from "react";
import style from "./ChatBox.module.css";
import { MessagesContext } from "../../../useContext/MessagesProvider";
import { MessageContentContext } from "../../../useContext/MessageContentProvider";

import Message from "./Message/Message.js";
import ChatHeader from "./ChatHeader/ChatHeader.js";
import socket from "../../../utils/socket.js";

function ChatBox(props) {

  useEffect(() =>{
    const room = getRoomCode();
    console.log("I AM MOUNTED")
    socket.on("connect", () => {
      console.log("CONNECTED OMG THIS IS ACTUALLY WORKING!!!");
    });

    socket.emit("room", room);

  }, [])


  const { messageContent, setMessageContent } = useContext(
    MessageContentContext
  ); //ANNOYING FORMATTER
  const { messages, setMessages } = useContext(MessagesContext);

  let lastMessage = useRef();

  document.onkeypress = function (event) {
    event = event || window.event;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!messageContent.replace(/\s/g, "").length) return;
      setMessageContent("");
      sendMessage();
    }
  };

  useEffect(() => {
    //lastMessage.scrollIntoView({ behavior: "smooth" });
    lastMessage.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });

    socket.on('receiveMessage', data => {
      console.log("I have received the message!");
      console.log("this is the data", data);
      addMessage(data);
    });

  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!messageContent.replace(/\s/g, "").length) return;
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

  const addMessage = (data) => {
    setMessages([...messages, data]);
  };

  const getDate = () => {
    const date = new Date();
    let hours = date.getHours();
    let amOrPm = "AM";
    if (hours > 12) {
      hours -= 12;
      amOrPm = "PM";
    }

    let minutes = date.getMinutes();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return hours + ":" + minutes + ` ${amOrPm}`;
  };

  const sendMessage = () => {
    const room = getRoomCode();
    const username = sessionStorage.getItem("username") || "No username"; //just in case
    const message = {
      content: messageContent,
      author: username,
      room: room,
      timestamp: getDate(),
    };
    //setMessages([...messages, message]);
    socket.emit("sendMessage", message);
    socket.on("receiveMessage", (data) => {
      console.log("I have received the message!");
      console.log("this is the data", data);
      addMessage(data);
    });
    addMessage({content: messageContent, author: "You", room: room, timestamp: getDate()});
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
        <div className={style.chatHeaderContainer}>
          <ChatHeader room={getRoomCode} handleClose={handleClose} />
        </div>
        <div id="messages" className={style.message}>
          {messages.map((message, key) => {
            return <Message key={key} message={message} />;
          })}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              lastMessage = el;
            }}
          ></div>
        </div>
      </div>

      <div className={style.textBar}>
        <form onSubmit={handleSubmit} className={style.formContainer}>
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
