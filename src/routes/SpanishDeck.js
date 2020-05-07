import React from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";

import SpanishDeckYellow from "../../public/Data/SpanishDeck/SpanishDeckYellow.json";
import SpanishDeckRed from "../../public/Data/SpanishDeck/SpanishDeckRed.json";

export default function SpanishDeck() {
  return (
    <PageBody>
      <div className="upperRow">
        <Logo />
        <RedDeck deck={SpanishDeckRed} />
      </div>
      <Hand deck={SpanishDeckYellow} />
    </PageBody>
  );
}
