import React from "react";
import ReactDOM from "react-dom";
import style from "./styles.css";

import PageBody from "./components/common/PageBody/PageBody";
import RedDeck from "./components/common/RedDeck/RedDeck";
import Logo from "./components/common/Logo/Logo";
import Hand from "./components/common/Hand/Hand";
import DiscardHandButton from "./components/common/DiscardHandButton/DiscardHandButton";
import ResetDecksButton from "./components/common/ResetDecksButton/ResetDecksButton";

function App() {
  return (
    <div className="App">
      <PageBody>
        <Logo />
        <RedDeck />
        <Hand />
        <p className={style.becauseParagraph}>I chose this card because </p>
        <DiscardHandButton />
        <ResetDecksButton />
      </PageBody>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
