import React, { useState, useEffect } from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";
import { Link, useParams, Redirect } from "react-router-dom";

import CommunityDeckYellow from "../data/CommunityDeck/CommunityDeckYellow.json";
import CommunityDeckRed from "../data/CommunityDeck/CommunityDeckRed.json";
import axios from "axios";
//This makes the code cleaner by returning the community deck route that will get called on index.js
const getBasename = (path) => path.substr(0, path.lastIndexOf("/"));
export default function CommunityDeck(props) {
  return (
    <PageBody>
      <div className="upperRow">
        <Logo marginTop="4%" />
        <RedDeck deck={CommunityDeckRed} />
        {/*
        <div className={"buttonContainer"}>
          <button className={"button"}>PLEASE WORK</button>
        </div>*/}
      </div>
      <Hand deck={CommunityDeckYellow} />
    </PageBody>
  );
}
