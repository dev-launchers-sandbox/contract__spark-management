import React, { useState, useEffect } from "react";
import style from "./Message.module.css";

function Message(props) {
  const imageExists = (image_url) => {
    try {
      var http = new XMLHttpRequest();

      http.open("HEAD", image_url, false);
      http.send();

      return http.status != 404;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className={style.messageHolder}>
      <div className={style.author}>
        <b>{props.message.author}:</b>
      </div>
      {imageExists(props.message.content) ? (
        <img className={style.image} src={props.message.content} alt="image" />
      ) : (
        <div className={style.content}>{props.message.content}</div>
      )}
    </div>
  );
}

export default Message;
