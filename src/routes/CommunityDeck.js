import React from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";

import CommunityDeckYellow from "../../public/Data/CommunityDeck/CommunityDeckYellow.json";
import CommunityDeckRed from "../../public/Data/CommunityDeck/CommunityDeckRed.json";

export default function CommunityDeck() {
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
