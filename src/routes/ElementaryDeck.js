import React, { useState, useEffect } from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";
import { Link, useParams } from "react-router-dom";

import ElementaryRedDeck from "../data/ElementaryDeck/ElementaryDeckRed.json";
import ElementaryYellowDeck from "../data/ElementaryDeck/ElementaryDeckYellow.json";
import axios from "axios";

//This makes the code cleaner by returning the conversational deck route that will get called on index.js

export default function ConversationalDeck(props) {
  return (
    <PageBody>
      <div className="upperRow">
        <div className="logoHolder">
          <Logo marginTop="4%" />
        </div>
        <RedDeck deck={ElementaryRedDeck} />
      </div>
      <Hand deck={ElementaryYellowDeck} />
    </PageBody>
  );
}
