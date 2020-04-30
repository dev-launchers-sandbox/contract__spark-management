import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import PageBody from "./components/common/PageBody/PageBody";
import RedDeck from "./components/common/RedDeck/RedDeck";
import Logo from "./components/common/Logo/Logo";
import Hand from "./components/common/Hand/Hand";

function App() {
  return (
    <div className="App">
      <PageBody>
        <Logo />
        <RedDeck />
        <Hand />
      </PageBody>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
