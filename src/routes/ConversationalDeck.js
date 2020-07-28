import React, { useEffect } from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";
import { Link, useParams } from "react-router-dom";

import ConversationalRedDeck from "../data/ConversationalDeck/ConversationalDeckRed";
import ConversationalYellowDeck from "../data/ConversationalDeck/ConversationalDeckYellow";
//This makes the code cleaner by returning the conversational deck route that will get called on index.js

export default function ConversationalDeck() {
  let { code } = useParams();
  useEffect(() => {
    console.log("ConversationalDeck Mounted!");
  }, []);
  return (
    <PageBody>
      <div className="upperRow">
        <Logo marginTop="4%" />
        <RedDeck deck={ConversationalRedDeck} />
      </div>
      <Hand deck={ConversationalYellowDeck} />
    </PageBody>
  );
}
