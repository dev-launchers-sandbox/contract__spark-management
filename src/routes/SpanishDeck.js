import React, { useState, useEffect } from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";
import { Link, useParams } from "react-router-dom";

import SpanishDeckYellow from "../data/SpanishDeck/SpanishDeckYellow.json";
import SpanishDeckRed from "../data/SpanishDeck/SpanishDeckRed.json";
import usePageView from "../utils/usePageView"
import axios from "axios";

//This makes the code cleaner by returning the spanish deck route that will get called on index.js

export default function SpanishDeck(props) {
  usePageView();
  return (
    <PageBody>
      <div className="upperRow">
        <div className="logoHolder">
          <Logo marginTop="4%" />
        </div>
        <RedDeck deck={SpanishDeckRed} />
      </div>
      <Hand deck={SpanishDeckYellow} />
    </PageBody>
  );
}
