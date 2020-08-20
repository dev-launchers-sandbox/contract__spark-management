import React from "react";
import style from "./HowToPlayButton.module.css";

export default function HowToPlayButton() {
  return (
    <div>
      <a href="https://spark4community.com/playing-remotely">
        <button className={style.howToPlayButton}>How To Play!</button>
      </a>
    </div>
  );
}
