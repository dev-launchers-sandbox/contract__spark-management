import React from "react";
import style from "./YellowCard.module.css";

import CopyTextIcon from "./../Icons/CopyTextIcon/CopyTextIcon";
import SelectCardIcon from "./../Icons/SelectCardIcon/SelectCardIcon";

export default function YellowCard(props) {
  return (
    <div className={style.OrangeCards}>
      <div>
        <h1>{props.answer}</h1>
      </div>
      <CopyTextIcon text={props.answer} />
      <SelectCardIcon onClick={props.onClick} />
    </div>
  );
}
