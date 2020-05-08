import React from "react";
import style from "./Logo.module.css";

import RedLogo from "/../../../../public/Images/red-spark-logo.png";

export default class Logo extends React.Component {
  render() {
    return (
      <div className={style.logo}>
        <img src={RedLogo} alt="Logo" />
        <div className={style.logoText}>
          MORE THAN A GAME. IT’S A LIFE CHANGING EXPERIENCE
        </div>
      </div>
    );
  }
}
