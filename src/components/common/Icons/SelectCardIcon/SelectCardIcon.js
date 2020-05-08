import React from "react";
import style from "./SelectCardIcon.module.css";
import drawCardIcon from "./../../../../../public/Images/draw-card-icon.png";

export default function SelectCardIcon(props) {
  return (
    <div>
      <img
        className={style.selectCardIcon}
        src={drawCardIcon}
        alt="Select Card"
        onClick={props.onClick}
      />
    </div>
  );
}
