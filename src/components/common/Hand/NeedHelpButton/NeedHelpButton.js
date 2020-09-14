import React from "react";
import style from "./NeedHelpButton.module.css";

export default function NeedHelpButton() {
  return (
    <div>
      <a href="https://spark4community.com/apphelp/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className={style.needHelpButton}>Need Help?</button>
      </a>
    </div>
  );
}
