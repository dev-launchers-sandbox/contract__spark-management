import React from "react";
import style from "./InstructionButton.module.css";
export default function InstructionButton() {
  return (
    <div className={style.instructionLinkHolder}>
      <a
        className={style.test}
        href="https://spark4community.com/playing-remotely"
      >
        {" "}
        How to play{" "}
      </a>
    </div>
  );
}
