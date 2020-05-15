import React from "react";
import ReactDOM from "react-dom";
import style from "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SelectDeck from "./components/common/SelectDeck/SelectDeck";

import CommunityDeckRoute from "./routes/CommunityDeck.js";
import ConversationalDeckRoute from "./routes/ConversationalDeck.js";
import SpanishDeckRoute from "./routes/SpanishDeck.js";
import YouthDeckRoute from "./routes/YouthDeck.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {/*When the app if 1st started, we want the user to be able to select the deck.*/}
            <SelectDeck />
          </Route>

          <Route path="/CommunityDeck">
            {/*When the community deck is selected, we want to show all of the things the deck should show*/}
            <CommunityDeckRoute />
          </Route>

          <Route exact path="/ConversationalDeck">
            {/*When the conversational deck is selected, we want to show all of the things the deck should show*/}
            <ConversationalDeckRoute />
          </Route>

          <Route exact path="/SpanishDeck">
            {/*When the spanish deck is selected, we want to show all of the things the deck should show*/}

            <SpanishDeckRoute />
          </Route>

          <Route exact path="/YouthDeck">
            {/*When the youth deck is selected, we want to show all of the things the deck should show*/}
            <YouthDeckRoute />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
