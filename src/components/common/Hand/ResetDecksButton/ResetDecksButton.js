import React, { useState } from "react";
import style from "./ResetDecksButton.module.css";
import useDeck from "./../../useDeck/useDeck";

export default function ResetDecksButton() {
  const { resetDecks } = useDeck([]);
  return (
    <div>
      <button onClick={resetDecks} className={style.resetDecksButton}>
        {" "}
        Reset Decks{" "}
      </button>
    </div>
  );
}
