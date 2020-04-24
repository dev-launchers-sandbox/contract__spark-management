import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import PageBody from "./components/common/PageBody/PageBody";
import RedDeck from "./components/common/RedDeck/RedDeck";
import Logo from "./components/common/Logo/Logo";

function App() {
  return (
    <div className="App">
      <PageBody>
        <Logo />
        <RedDeck />
      </PageBody>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
