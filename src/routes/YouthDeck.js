import React from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";
import { Link, useParams } from "react-router-dom";

import YouthDeckYellow from "../data/YouthDeck/YouthDeckYellow.json";
import YouthDeckRed from "../data/YouthDeck/YouthDeckRed.json";
import InstructionButton from "../components/common/InstructionButton/InstructionButton";

//This makes the code cleaner by returning the teen deck route that will get called on index.js

export default function YouthDeck() {
  let { code } = useParams();
  return (
    <PageBody>
      <div className="upperRow">
        <Logo marginTop="4%" />
        <RedDeck deck={YouthDeckRed} />
        <InstructionButton />
      </div>
      <Hand deck={YouthDeckYellow} />
    </PageBody>
  );
}
