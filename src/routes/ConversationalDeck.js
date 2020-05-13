import React from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";

import ConversationalDeckYellow from "../../public/Data/ConversationalDeck/ConversationalDeckYellow.json";
import ConversationalDeckRed from "../../public/Data/ConversationalDeck/ConversationalDeckRed.json";

//This makes the code cleaner by returning the conversational deck route that will get called on index.js

export default function ConversationalDeck() {
  return (
    <PageBody>
      <div className="upperRow">
        <Logo />
        <RedDeck deck={ConversationalDeckRed} />
      </div>
      <Hand deck={ConversationalDeckYellow} />
    </PageBody>
  );
}
