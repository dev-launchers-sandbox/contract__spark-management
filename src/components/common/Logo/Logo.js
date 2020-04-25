import React from "react";
import style from "./Logo.module.css";

import RedLogo from "/../../../../public/Images/spark-logo-alpha--red.png";

export default class Logo extends React.Component {
  render() {
    return (
      <div className={style.Logo}>
        <img src={RedLogo} alt="Logo" />
        <p className={style.logoText}>
          MORE THAN A GAME. IT’S A LIFE CHANGING EXPERIENCE
        </p>
      </div>
    );
  }
}
