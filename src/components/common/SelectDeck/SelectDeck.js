import React from "react";
import { Link } from "react-router-dom";
import style from "./SelectDeck.module.css";

import PageBody from "../PageBody/PageBody.js";

export default function SelectDeck() {
  return (
    <PageBody>
      <div className={style.selectDeckContainer}>
        <Link className={style.Link} to="/CommunityDeck">
          <div
            style={{ backgroundColor: "#fdbd32" }}
            className={style.selection}
          >
            <h1>Community Deck </h1>
          </div>
        </Link>

        <Link className={style.Link} to="/ConversationalDeck">
          <div
            style={{ backgroundColor: "#961a1e" }}
            className={style.selection}
          >
            <h1> Conversational Deck </h1>
          </div>
        </Link>

        <Link className={style.Link} to="/SpanishDeck">
          <div
            style={{ backgroundColor: "#961a1e" }}
            className={style.selection}
          >
            <h1> Spanish Deck </h1>
          </div>
        </Link>

        <Link className={style.Link} to="/TeenDeck">
          <div
            style={{ backgroundColor: "#fdbd32" }}
            className={style.selection}
          >
            <h1>Teen Deck </h1>
          </div>
        </Link>
      </div>
    </PageBody>
  );
}
