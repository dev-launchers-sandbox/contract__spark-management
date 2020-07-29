import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { Link, useParams, Redirect } from "react-router-dom";
import style from "./SelectDeck.module.css";
import axios from "axios";
import Logo from "../Logo/Logo.js";
import PageBody from "../PageBody/PageBody.js";
import EULAModal from "../EULAModal/EULAModal.js";

import TransparentLogo from "./../../../images/spark_app_logo_transparent.png";

export default function SelectDeck(props) {
  const [statusCode, setStatusCode] = useState();
  let { code } = useParams();
  console.log("params code: ", code);
  // This is what will first appear and it will redirect the user into the selected deck.
  return (
    <PageBody>
      <div className={style.upperRow}>
        {/* When the logo gets clicked, it wll open the sparkcommunity webpage */}
        <a className={style.logo} href="https://spark4community.com/">
          <img src={TransparentLogo} alt="logo" />
        </a>
        <Link to="/">
          <div className={style.tagline}>
            The game that connects communities, one conversation at a time.
          </div>
        </Link>
      </div>
      <div className={style.selectDeckContainer}>
        <div className={style.decksHolder}>
          <Link className={style.Link} to={`/${code}/CommunityDeck`}>
            {/*Links you to the community deck*/}
            <div
              style={{ backgroundColor: "#9f112a" }}
              className={style.selection}
            >
              <span>Community Deck </span>
            </div>
          </Link>
          <Link className={style.Link} to={`/${code}/ConversationalDeck`}>
            {/*Links you to the Conversational Deck*/}
            <div
              style={{ backgroundColor: "#9f112a" }}
              className={style.selection}
            >
              <span>Conversational Deck</span>{" "}
            </div>
          </Link>
          <Link className={style.Link} to={`/${code}/SpanishDeck`}>
            {/*Links you to the Spanish deck*/}
            <div
              style={{ backgroundColor: "#9f112a" }}
              className={style.selection}
            >
              <span>Spanish Deck</span>{" "}
            </div>
          </Link>
          <Link className={style.Link} to={`/${code}/YouthDeck`}>
            {/*Links you to the Youth deck*/}
            <div
              style={{ backgroundColor: "#9f112a" }}
              className={style.selection}
            >
              <span>Youth Deck</span>
            </div>
          </Link>
        </div>
      </div>
      <div className={style.descriptionArea}>
        <div>
          <h1>Ready to S.P.A.R.K. a connection?</h1>
        </div>

        <p>
          S.P.A.R.K. is an interactive card game that facilitates a fun,
          community building experience.
        </p>
        <p>
          The game was designed to help create conditions for equity/inclusion
          work, normalizing that relational trust is required for progress.
        </p>
        <p>
          {" "}
          With a unique structure, S.P.A.R.K. encourages listening with
          curiosity, which in turn allows us to better empathize with others
          across difference.
        </p>
      </div>
      {/* Checks if the code has been verified*/}
      {sessionStorage.getItem(code) === null && <Redirect to="/" />}
    </PageBody>
  );
}
