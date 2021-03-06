import React, { useState, useEffect } from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";
import { Link, useParams } from "react-router-dom";
import Toggle from "../components/common/Toggle/Toggle.js";
import ChatBox from "../components/common/ChatBox/ChatBox.js";

import ElementaryRedDeck from "../data/ElementaryDeck/ElementaryDeckRed.json";
import ElementaryYellowDeck from "../data/ElementaryDeck/ElementaryDeckYellow.json";
import ReactionsManager from "../components/common/ReactionsManager/ReactionsManager.js";
import usePageView from "../utils/usePageView";
import axios from "axios";

//This makes the code cleaner by returning the conversational deck route that will get called on index.js

export default function ConversationalDeck(props) {
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
            <RedDeck openChat={handleCallBack} deck={ElementaryRedDeck} />
            {chatOpen ? "" : <Toggle handleCallBack={handleCallBack} />}
          </div>
          <Hand openChat={handleCallBack} deck={ElementaryYellowDeck} />
        </div>
        <div className={chatOpen ? "rightColumn" : "rightColumnNotActive"}>
          {chatOpen && <ChatBox handleCallBack={handleCallBack} />}
        </div>
        <ReactionsManager />
      </div>
    </PageBody>
  );
}
