import React, { useState } from "react";
import style from "./Hand.module.css";

import YellowCard from "./../YellowCard/YellowCard";
import YellowCardInfo from "/../../../../public/Data/YellowCards.json";

export default function Hand(props) {
  const [currentValues, changeCurrentValues] = useState([
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ]);
  return (
    <div className={style.Hand}>
      <YellowCard answer={YellowCardInfo[currentValues[0]].answer} />
      <YellowCard answer={YellowCardInfo[currentValues[1]].answer} />
      <YellowCard answer={YellowCardInfo[currentValues[2]].answer} />
      <YellowCard answer={YellowCardInfo[[currentValues[3]]].answer} />
      <YellowCard answer={YellowCardInfo[[currentValues[4]]].answer} />
      <YellowCard answer={YellowCardInfo[[currentValues[5]]].answer} />
      <YellowCard answer={YellowCardInfo[[currentValues[6]]].answer} />
      <YellowCard answer={YellowCardInfo[[currentValues[7]]].answer} />
    </div>
  );
}
