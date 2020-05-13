import React from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";

import TeenDeckYellow from "../../public/Data/TeenDeck/TeenDeckYellow.json";
import TeenDeckRed from "../../public/Data/TeenDeck/TeenDeckRed.json";

//This makes the code cleaner by returning the teen deck route that will get called on index.js

export default function TeenDeck() {
  return (
    <PageBody>
      <div className="upperRow">
        <Logo />
        <RedDeck deck={TeenDeckRed} />
      </div>
      <Hand deck={TeenDeckYellow} />
    </PageBody>
  );
}
