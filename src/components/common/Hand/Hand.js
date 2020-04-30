import React, { useState } from "react";
import style from "./Hand.module.css";

import YellowDeck from "./../YellowDeck/YellowDeck";
import YellowCard from "./../YellowCard/YellowCard";
import YellowCardInfo from "/../../../../public/Data/YellowCards.json";

export default function Hand(props) {
  return (
    <div className={style.Hand}>
      <YellowCard answer={YellowCardInfo[0].answer} />
      <YellowCard answer={YellowCardInfo[1].answer} />
      <YellowCard answer={YellowCardInfo[2].answer} />
      <YellowCard answer={YellowCardInfo[3].answer} />
      <YellowCard answer={YellowCardInfo[4].answer} />
      <YellowCard answer={YellowCardInfo[5].answer} />
      <YellowCard answer={YellowCardInfo[6].answer} />
      <YellowCard answer={YellowCardInfo[7].answer} />
    </div>
  );
}
