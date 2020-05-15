import React, { useEffect } from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";

import CommunityDeckYellow from "../../public/Data/CommunityDeck/CommunityDeckYellow.json";
import CommunityDeckRed from "../../public/Data/CommunityDeck/CommunityDeckRed.json";

//This makes the code cleaner by returning the community deck route that will get called on index.js

export default function CommunityDeck() {
  useEffect(() => {
    console.log("CommunityDeck Mounted!");
  }, []);
  return (
    <PageBody>
      <div className="upperRow">
        <Logo />
        <RedDeck deck={CommunityDeckRed} />
      </div>
      <Hand deck={CommunityDeckYellow} />
    </PageBody>
  );
}
