import React from "react";
import style from "./SelectCardIcon.module.css";

const selectCardIcon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Bright_green_checkbox-checked.svg/1024px-Bright_green_checkbox-checked.svg.png";

export default function SelectCardIcon(props) {
  return (
    <div>
      <img
        className={style.selectCardIcon}
        src={selectCardIcon}
        alt="Select Card"
        onClick={props.onClick}
      />
    </div>
  );
}
