import React, { useState, useEffect } from "react";
import style from "./YellowCard.module.css";
import ReactCardFlip from "react-card-flip";

import redLogo from "./../../../images/red-spark-logo.png";
import SendToChatIcon from "./../Icons/SendToChatIcon/SendToChatIcon";
import SelectCardIcon from "./../Icons/SelectCardIcon/SelectCardIcon";

export default function YellowCard(props) {
  function cardRenderer() {
    if (props.emoji) {
      return (
        <div style={{ flexDirection: "column" }}>
          <h1
            style={{
              marginTop: null,
              fontSize: "1.2rem",
            }}
          >
            {props.answer}
            <br />
            <br />
            <span
              style={{
                fontSize: "3rem",
              }}
            >
              {props.emoji}
            </span>
          </h1>
        </div>
      );
    } else {
      return (
        <h1 style={{ fontSize: props.isEmoji ? "4rem" : "1.2rem" }}>
          {props.answer}
        </h1>
      );
    }
  }
  //styling for all of the CardFlip properties

  return (
    <ReactCardFlip
      containerStyle={{ margin: "2%" }}
      flipSpeedBackToFront="1"
      flipSpeedFrontToBack="1"
      flipDirection="vertical"
      isFlipped={props.isFlipped}
    >
      <div
        // the key is what makes the ReactCardFlip package to know which part is the front or back part.
        key="front"
        style={{ transformStyle: "initial" }}
        className={style.YellowCard}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <div>{cardRenderer()}</div>
          <SendToChatIcon openChat={props.openChat} text={props.answer} />
          <SelectCardIcon onClick={props.onClick} />
        </div>
      </div>

      <div
        //The key is what makes the ReactCardFlip package to know which part is the front or back part.
        key="back"
        style={{ transformStyle: "initial" }}
        className={style.YellowCard}
      >
        <img
          className={style.logo}
          src={process.env.PUBLIC_URL + "/images/red-spark-logo.png"}
          alt="logo"
        />
      </div>
    </ReactCardFlip>
  );
}
