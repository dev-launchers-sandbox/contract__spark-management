import React from "react";
import style from "./ResetButton.module.css";

export default function ResetDecksButton() {
  const reset = () => {
    window.location.reload(true);
  };
  return (
    <div>
      <button onClick={reset} className={style.resetDecksButton}>
        {" "}
        Reset{" "}
      </button>
    </div>
  );
}
