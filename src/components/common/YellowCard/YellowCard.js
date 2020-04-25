import React from "react";
import style from "./YellowCard.module.css";

import YellowCardInfo from "/../../../../public/Data/YellowCards.json";

export default function YellowCard(props) {
  return (
    <div className={style.OrangeCards}>
      <h1>{props.answer}</h1>
    </div>
  );
}
