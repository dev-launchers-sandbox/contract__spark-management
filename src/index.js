import React from "react";
import ReactDOM from "react-dom";
import style from "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PageBody from "./components/common/PageBody/PageBody";
import RedDeck from "./components/common/RedDeck/RedDeck";
import Logo from "./components/common/Logo/Logo";
import Hand from "./components/common/Hand/Hand";

function App() {
  return (
    <div className="App">
      <PageBody>
        <div className="upperRow">
          <Logo />
          <RedDeck />
        </div>
        <Hand />
      </PageBody>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
