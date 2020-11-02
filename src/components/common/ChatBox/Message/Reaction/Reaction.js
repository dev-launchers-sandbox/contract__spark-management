import React from "react";
import style from "./Reaction.module.css";

function Reaction(props) {
  return (
    <div
      className={
        props.isChecked ? style.checkedReaction : style.notCheckedReaction
      }
    >
      <p>
        {" "}
        {props.emoji} {props.count}
      </p>
    </div>
  );
}

export default Reaction;
