import React from "react";
import ReactDOM from "react-dom";
import style from "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SelectDeck from "./components/common/SelectDeck/SelectDeck";

import CommunityDeckRoute from "./routes/CommunityDeck.js";
import ConversationalDeckRoute from "./routes/CommunityDeck.js";
import SpanishDeckRoute from "./routes/SpanishDeck.js";
import TeenDeckRoute from "./routes/TeenDeck.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <SelectDeck />
          </Route>

          <Route path="/CommunityDeck">
            <CommunityDeckRoute />
          </Route>

          <Route exact path="/ConversationalDeck">
            <ConversationalDeckRoute />
          </Route>

          <Route exact path="/SpanishDeck">
            <SpanishDeckRoute />
          </Route>

          <Route exact path="/TeenDeck">
            <TeenDeckRoute />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
