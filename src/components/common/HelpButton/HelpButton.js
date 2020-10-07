import React, { useState, useEffect } from "react";
import style from "./HelpButton.module.css";

function HelpButton() {
  return (
    <div className={style.helpButton}>
      <a
        href="https://spark4community.com/contact/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className={style.button}>Need Help?</button>
      </a>
    </div>
  );
}

export default HelpButton;
