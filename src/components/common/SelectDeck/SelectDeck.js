import React from "react";
import { Link } from "react-router-dom";
import style from "./SelectDeck.module.css";

import Logo from "../Logo/Logo.js";
import PageBody from "../PageBody/PageBody.js";

import RedLogo from "/../../../../public/Images/red-spark-logo.png";

export default function SelectDeck() {
  // This is what will first appear and it will redirect the user into the selected deck.
  return (
    <PageBody>
      <div className={style.upperRow}>
        {/* When the logo gets clicked, it wll open the sparkcommunity webpage */}
        <a className={style.logo} href="https://spark4community.com/">
          <img
            src="https://spark4community.com/wp-content/uploads/2020/02/logo-wide-400w.png"
            alt="logo"
          />
        </a>
        <div className={style.tagline}>
          The game that connects communities, one conversation at a time.
        </div>
      </div>
      <div className={style.selectDeckContainer}>
        <div className={style.decksHolder}>
          <Link className={style.Link} to="/CommunityDeck">
            {/*Links you to the community deck*/}
            <div
              style={{ backgroundColor: "#9f112a" }}
              className={style.selection}
            >
              <span>Community Deck</span>
            </div>
          </Link>
          <Link className={style.Link} to="/ConversationalDeck">
            {/*Links you to the Conversational Deck*/}
            <div
              style={{ backgroundColor: "#9f112a" }}
              className={style.selection}
            >
              <span>Conversational Deck</span>{" "}
            </div>
          </Link>
          <Link className={style.Link} to="/SpanishDeck">
            {/*Links you to the Spanish deck*/}
            <div
              style={{ backgroundColor: "#9f112a" }}
              className={style.selection}
            >
              <span>Spanish Deck</span>{" "}
            </div>
          </Link>
          <Link className={style.Link} to="/TeenDeck">
            {/*Links you to the Youth deck*/}
            <div
              style={{ backgroundColor: "#9f112a" }}
              className={style.selection}
            >
              <span>Teen Deck</span>
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
      <div className={style.footer}>S.P.A.R.K. 2020 ©</div>
    </PageBody>
  );
}
