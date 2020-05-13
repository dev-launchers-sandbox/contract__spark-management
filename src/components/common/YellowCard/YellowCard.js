import React from "react";
import style from "./YellowCard.module.css";
import ReactCardFlip from "react-card-flip";

import RedLogo from "/../../../../public/Images/red-spark-logo.png";
import CopyTextIcon from "./../Icons/CopyTextIcon/CopyTextIcon";
import SelectCardIcon from "./../Icons/SelectCardIcon/SelectCardIcon";

export default function YellowCard(props) {
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
          <div>
            <h1>{props.answer}</h1>
          </div>
          <CopyTextIcon text={props.answer} />
          <SelectCardIcon onClick={props.onClick} />
        </div>
      </div>

      <div
        //The key is what makes the ReactCardFlip package to know which part is the front or back part.
        key="back"
        style={{ transformStyle: "initial" }}
        className={style.YellowCard}
      >
        <img className={style.logo} src={RedLogo} alt="logo" />
      </div>
    </ReactCardFlip>
  );
}
