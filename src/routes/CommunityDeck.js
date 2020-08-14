import React, { useState, useEffect } from "react";

import PageBody from "../components/common/PageBody/PageBody";
import RedDeck from "../components/common/RedDeck/RedDeck";
import Logo from "../components/common/Logo/Logo";
import Hand from "../components/common/Hand/Hand";
import { Link, useParams, Redirect } from "react-router-dom";

import CommunityDeckYellow from "../data/CommunityDeck/CommunityDeckYellow.json";
import CommunityDeckRed from "../data/CommunityDeck/CommunityDeckRed.json";
import InstructionButton from "../components/common/InstructionButton/InstructionButton";
import axios from "axios";
//This makes the code cleaner by returning the community deck route that will get called on index.js
const getBasename = (path) => path.substr(0, path.lastIndexOf("/"));
export default function CommunityDeck(props) {
  /*
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    //let mounted = true

    if (props.code === "") {
      return;
    }
    const getClientLogoUrl = async () => {
      try {
        console.log("spanish form code: ", props.code);
        const response = await axios.get(`http://192.232.212.61:80/codes/${props.code}/validate`)
        setLogoUrl(response.data.logo_url);

        console.log("logo url: ", response);
      } catch (err) {
        console.error("this is the error", err);
      }
    };
    getClientLogoUrl();

    //return () => mounted = false;

  }, [props.code]);
  */
  return (
    <PageBody>
      <div className="upperRow">
        <Logo marginTop="4%" code={props.code} />
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
