import React from "react";
import style from "./Reaction.module.css";

function Reaction(props) {
  return (
    <div
      style={{
        backgroundColor: props.reaction.isChecked ? "#94afeb" : "#d1c9c9",
      }}
      className={style.reaction}
    >
      <p>
        {" "}
        {props.reaction.emoji} {props.reaction.count}
      </p>
    </div>
  );
}

export default Reaction;
