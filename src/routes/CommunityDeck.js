import React, { useEffect } from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";
import { Link, useParams } from "react-router-dom";

import CommunityDeckYellow from "../data/CommunityDeck/CommunityDeckYellow.json";
import CommunityDeckRed from "../data/CommunityDeck/CommunityDeckRed.json";
import InstructionButton from "../components/common/InstructionButton/InstructionButton";
//This makes the code cleaner by returning the community deck route that will get called on index.js

export default function CommunityDeck() {
  let { code } = useParams();
  useEffect(() => {
    console.log("CommunityDeck Mounted!");
  }, []);
  return (
    <PageBody>
      <div className="upperRow">
        <Logo marginTop="4%" />
        <RedDeck deck={CommunityDeckRed} />
        <InstructionButton />
        {/*
        <div className={"buttonContainer"}>
          <button className={"button"}>PLEASE WORK</button>
        </div>*/}
      </div>
      <Hand deck={CommunityDeckYellow} />
    </PageBody>
  );
}
