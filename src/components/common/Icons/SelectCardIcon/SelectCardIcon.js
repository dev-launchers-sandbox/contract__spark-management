import React from "react";
import style from "./SelectCardIcon.module.css";
import drawCardIcon from "./../../../../images/draw-card-icon.png";

export default function SelectCardIcon(props) {
  // This returns the img that when clicked will select the card and draw a new one.
  return (
    <div>
      <img
        className={style.selectCardIcon}
        src={drawCardIcon}
        alt="Select Card"
        onClick={props.onClick}
        title="draw new card"
      />
    </div>
  );
}
