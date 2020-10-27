import React, { useState, useEffect } from "react";
import style from "./Message.module.css";

function Message(props) {
  /*
  const imageExists = (image_url) => {
    try {
      var http = new XMLHttpRequest();

      http.open("HEAD", image_url, false);
      http.send();

      return http.status != 404;
    } catch (error) {
      console.log("No load");
      return false;
    }
  };
  */

  const getTime = () => {
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

  return (
    <div className={style.messageHolder}>
      <div className={style.author}>
        <b>{props.message.author} </b>{" "}
        <div className={style.date}> {getTime()} </div>
      </div>
      
        <div className={style.content}>{props.message.content}</div>

    </div>
  );
}

export default Message;
