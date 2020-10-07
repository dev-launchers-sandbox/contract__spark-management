import React, { useState, useEffect } from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";
import { Link, useParams, Redirect } from "react-router-dom";

import CommunityDeckYellow from "../data/CommunityDeck/CommunityDeckYellow.json";
import CommunityDeckRed from "../data/CommunityDeck/CommunityDeckRed.json";
import usePageView from "../utils/usePageView"
import axios from "axios";

//This makes the code cleaner by returning the community deck route that will get called on index.js

export default function CommunityDeck(props) {
  usePageView();
  return (
    <PageBody>
      <div className="upperRow">
        <div className="logoHolder">
          <Logo marginTop="4%" />
        </div>
        <RedDeck deck={CommunityDeckRed} />
      </div>
      <Hand deck={CommunityDeckYellow} />
    </PageBody>
  );
}
