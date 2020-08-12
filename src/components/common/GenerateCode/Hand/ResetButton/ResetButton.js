import React from "react";
import style from "./ResetButton.module.css";

export default function ResetDecksButton() {
  //This is the component that facilitates the reset of the entire app.

  //  reset(): Forces the app to reload causing a entirely new deck and hand.
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
