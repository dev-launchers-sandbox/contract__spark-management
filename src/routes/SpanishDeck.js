import React from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";
import { Link, useParams } from "react-router-dom";

import SpanishDeckYellow from "../data/SpanishDeck/SpanishDeckYellow.json";
import SpanishDeckRed from "../data/SpanishDeck/SpanishDeckRed.json";
import InstructionButton from "../components/common/InstructionButton/InstructionButton";

//This makes the code cleaner by returning the spanish deck route that will get called on index.js

export default function SpanishDeck() {
  let { code } = useParams();
  return (
    <PageBody>
      <div className="upperRow">
        <Logo marginTop="4%" />
        <RedDeck deck={SpanishDeckRed} />
        <InstructionButton />
      </div>
      <Hand deck={SpanishDeckYellow} />
    </PageBody>
  );
}
