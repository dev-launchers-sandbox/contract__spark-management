import React from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";

import YouthDeckYellow from "../../public/Data/YouthDeck/YouthDeckYellow.json";
import YouthDeckRed from "../../public/Data/YouthDeck/YouthDeckRed.json";

//This makes the code cleaner by returning the teen deck route that will get called on index.js

export default function YouthDeck() {
  return (
    <PageBody>
      <div className="upperRow">
        <Logo />
        <RedDeck deck={YouthDeckRed} />
      </div>
      <Hand deck={YouthDeckYellow} />
    </PageBody>
  );
}
