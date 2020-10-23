import React, { useState, useEffect } from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";
import ChatBox from "../components/common/ChatBox/ChatBox.js";

import { Link, useParams } from "react-router-dom";

import YouthDeckYellow from "../data/YouthDeck/YouthDeckYellow.json";
import YouthDeckRed from "../data/YouthDeck/YouthDeckRed.json";
import usePageView from "../utils/usePageView"

import axios from "axios";

//This makes the code cleaner by returning the teen deck route that will get called on index.js

export default function YouthDeck(props) {
  usePageView();
  return (
    <PageBody>
      <div className="container">
        <div className="leftColumn">
          <div className="upperRow">
            <div className="logoHolder">
              <Logo marginTop="4%" />
            </div>
            <RedDeck deck={YouthDeckRed} />
          </div>
          <Hand deck={YouthDeckYellow} />
        </div>
        <div className="rightColumn">
          <ChatBox />
        </div>
      </div>
    </PageBody>
  );
}
