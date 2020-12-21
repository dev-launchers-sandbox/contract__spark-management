import React, { useState, useEffect, useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import style from "./ChatBox.module.css";
import { MessagesContext } from "../../../useContext/MessagesProvider";
import { MessageContentContext } from "../../../useContext/MessageContentProvider";

import Message from "./Message/Message.js";
import ChatHeader from "./ChatHeader/ChatHeader.js";
import socket from "../../../utils/socket.js";
import SendMessageIcon from "./../Icons/SendMessageIcon/SendMessageIcon";

function ChatBox(props) {
  const { messageContent, setMessageContent } = useContext(
    MessageContentContext
  ); //ANNOYING FORMATTER
  const { messages, setMessages } = useContext(MessagesContext);

  let lastMessage = useRef();
  let messagesContainer = useRef();
  let chatHeader = useRef();
  //Limit keypresses to textarea
  //REACT

  const getFullHeight = () => {
    return (
      messagesContainer.getBoundingClientRect().height -
      chatHeader.getBoundingClientRect().height
    );
  };
  useEffect(() => {
    //console.log("2st ", chatHeader.getBoundingClientRect());
    lastMessage.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [messages.length]);

  useEffect(() => {
    socket.off("receiveMessage");

    socket.on("receiveMessage", (data) => {
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

  const getId = () => {
    return uuidv4();
  };

  const sendMessage = () => {
    const room = getRoomCode();
    const username = sessionStorage.getItem("username") || "No username"; //just in case
    const id = getId();
    const message = {
      content: messageContent,
      author: username,
      room: room,
      timestamp: getDate(),
      id: id,
      reactions: [],
    };

    socket.emit("sendMessage", message);

    addMessage({
      content: messageContent,
      author: "You",
      room: room,
      timestamp: getDate(),
      id: id,
      reactions: [],
    });
  };

  const onEnterPress = (e) => {
    if (!e) return;
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getRoomCode = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let urlToString = urlParams.toString();
    return urlToString.substr(5);
  };

  return (
    <div className={style.container}>
      <div
        ref={(ol) => {
          messagesContainer = ol;
        }}
        className={style.messageArea}
      >
        <div
          ref={(ol) => {
            chatHeader = ol;
          }}
          className={style.chatHeaderContainer}
        >
          <ChatHeader room={getRoomCode} handleClose={handleClose} />
        </div>
        <div id="messages" className={style.message}>
          {messages.map((message, key) => {
            return (
              <Message
                getFullHeight={getFullHeight}
                key={key}
                message={message}
              />
            );
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
            onKeyDown={onEnterPress}
          />
          <SendMessageIcon handleSubmit={handleSubmit} />
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
