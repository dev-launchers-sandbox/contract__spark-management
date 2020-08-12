import React, { useState, useEffect } from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";
import { Link, useParams } from "react-router-dom";

import ConversationalRedDeck from "../data/ConversationalDeck/ConversationalDeckRed";
import ConversationalYellowDeck from "../data/ConversationalDeck/ConversationalDeckYellow";
import InstructionButton from "../components/common/InstructionButton/InstructionButton";
import axios from "axios";

//This makes the code cleaner by returning the conversational deck route that will get called on index.js

export default function ConversationalDeck(props) {
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    if (props.code === "") {
      return;
    }
    const getClientLogoUrl = async () => {
      try {
        console.log("spanish form code: ", props.code);
        const response = await axios.get("/codes/validate", {
          params: { code: props.code }
        });
        setLogoUrl(response.data.logo_url);

        console.log("logo url: ", response);
      } catch (err) {
        console.error("this is the error", err);
      }
    };
    getClientLogoUrl();
  }, [props.code]);
  return (
    <PageBody>
      <div className="upperRow">
        <Logo marginTop="4%" logoUrl={logoUrl} />
        <RedDeck deck={ConversationalRedDeck} />
        <InstructionButton />
      </div>
      <Hand deck={ConversationalYellowDeck} />
    </PageBody>
  );
}
