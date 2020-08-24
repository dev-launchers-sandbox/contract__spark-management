import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import style from "./Button.module.css";

export default function Button(props) {
  const clickHandler = () => {
    if (props.doNothing) return;
    else if (props.href) window.open(props.href, "_blank");
    else if (props.toast) toast(props.toast);
  };

  let buttonStyle = props.style ? props.style : {};
  buttonStyle.fontSize = props.fontSize || buttonStyle.fontSize;

  return (
    <div className={style.button}>
      <button
        className={style.Button}
        style={buttonStyle}
        onClick={props.onClick ? props.onClick : clickHandler}
      >
        {props.children}
      </button>
    </div>
  );
}
