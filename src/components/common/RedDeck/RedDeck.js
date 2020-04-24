import React from "react";
import style from "./RedDeck.module.css";
import WhiteLogo from "/../../../../public/Images/white-spark-logo.png";

export default class RedDeck extends React.Component {
  render() {
    return (
      <div className={style.RedDeck}>
        <img src={WhiteLogo} alt="Logo" />
      </div>
    );
  }
}
