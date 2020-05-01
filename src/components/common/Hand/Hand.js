import React, { useState, useEffect } from "react";
import style from "./Hand.module.css";

import useDeck from "./../useDeck/useDeck";
import YellowCard from "./../YellowCard/YellowCard";
import YellowCardInfo from "/../../../../public/Data/YellowCards.json";

export default function Hand(props) {
  const { hand, resetDecks, shuffleCards, drawCard } = useDeck(YellowCardInfo);

  return (
    <div className={style.Hand}>
      <YellowCard answer={drawCard().answer} />
      <YellowCard answer={drawCard().answer} />
      <YellowCard answer={drawCard().answer} />
      <YellowCard answer={drawCard().answer} />
      <YellowCard answer={drawCard().answer} />
      <YellowCard answer={drawCard().answer} />
      <YellowCard answer={drawCard().answer} />
      <YellowCard answer={drawCard().answer} />
    </div>
  );
}
