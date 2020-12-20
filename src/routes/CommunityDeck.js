import React, { useState, useEffect } from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";
import ChatBox from "../components/common/ChatBox/ChatBox.js";
import Toggle from "../components/common/Toggle/Toggle.js";

import { Link, useParams, Redirect } from "react-router-dom";

import CommunityDeckYellow from "../data/CommunityDeck/CommunityDeckYellow.json";
import CommunityDeckRed from "../data/CommunityDeck/CommunityDeckRed.json";
import ReactionsManager from "../components/common/ReactionsManager/ReactionsManager.js";
import usePageView from "../utils/usePageView";

import axios from "axios";

//This makes the code cleaner by returning the community deck route that will get called on index.js

export default function CommunityDeck(props) {
  usePageView();

  const [chatOpen, setChatOpen] = useState(false);

  const handleCallBack = (isChatOpen) => {
    setChatOpen(isChatOpen);
  };


  return (
    <PageBody>
      <div className="container">
        <div className={chatOpen ? "leftColumn" : "leftColumnNotActive"}>
          <div className="upperRow">
            <div className="logoHolder">
              <Logo marginTop="4%" />
            </div>
            <RedDeck openChat={handleCallBack} deck={CommunityDeckRed} />
            {chatOpen ? "" : <Toggle handleCallBack={handleCallBack} />}
          </div>
          <Hand openChat={handleCallBack} deck={CommunityDeckYellow} />
        </div>
        <div className={chatOpen ? "rightColumn" : "rightColumnNotActive"}>
          {chatOpen && <ChatBox handleCallBack={handleCallBack} />}
        </div>
        <ReactionsManager />
      </div>
    </PageBody>
  );
}
