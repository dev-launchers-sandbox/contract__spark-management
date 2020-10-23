import React, { useState, useEffect } from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";
import ChatBox from "../components/common/ChatBox/ChatBox.js";
import Toggle from "../components/common/Toggle/Toggle.js";


import { Link, useParams } from "react-router-dom";

import YouthDeckYellow from "../data/YouthDeck/YouthDeckYellow.json";
import YouthDeckRed from "../data/YouthDeck/YouthDeckRed.json";
import usePageView from "../utils/usePageView"

import axios from "axios";

//This makes the code cleaner by returning the teen deck route that will get called on index.js

export default function YouthDeck(props) {
  usePageView();

  const [chatOpen, setChatOpen] = useState(false);

  const handleCallBack = (isChatOpen) => {
    setChatOpen(isChatOpen);
  }


  return (
    <PageBody>
      <div className="container">
        <div className={chatOpen ? "leftColumn" : "leftColumnNotActive"}>
          <div className="upperRow">
            <div className="logoHolder">
              <Logo marginTop="4%" />
            </div>
            <RedDeck deck={YouthDeckRed} />
            {chatOpen ? "" : <Toggle handleCallBack={handleCallBack} />}
          </div>
          <Hand deck={YouthDeckYellow} />
        </div>
        <div className={chatOpen ? "rightColumn" : "rightColumnNotActive"}>
          {chatOpen && <ChatBox handleCallBack={handleCallBack}/>}
        </div>
      </div>
    </PageBody>
  );
}
