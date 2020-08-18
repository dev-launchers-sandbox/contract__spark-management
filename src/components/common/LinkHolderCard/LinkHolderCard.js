import React, { useState, useEffect } from "react";
import style from "./LinkHolderCard.module.css";
import ReactCardFlip from "react-card-flip";
import RedLogo from "./../../../images/red-spark-logo.png";

export default function InstructionButton() {
  const [isFlipped, setIsFlipped] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsFlipped(false);
    }, 1000);
  }, []);
  return (
    <ReactCardFlip
      containerStyle={{ margin: "2%" }}
      flipSpeedBackToFront="1"
      flipSpeedFrontToBack="1"
      flipDirection="vertical"
      isFlipped={isFlipped}
    >
      <div
        key="front"
        style={{ transformStyle: "initial" }}
        className={style.LinkHolderCard}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <a href="https://spark4community.com/playing-remotely">
            {" "}
            How to Play!{" "}
          </a>
          <a href="https://spark4community.com/contact/"> Need Help? </a>
        </div>
      </div>
      <div
        //The key is what makes the ReactCardFlip package to know which part is the front or back part.
        key="back"
        style={{ transformStyle: "initial" }}
        className={style.LinkHolderCard}
      >
        <img className={style.logo} src={RedLogo} alt="logo" />
      </div>
    </ReactCardFlip>
  );
}

// https://spark4community.com/playing-remotely
// https://spark4community.com/contact/
