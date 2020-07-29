import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import style from "./styles.css";
import {
  HashRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
  useRouterHistory
} from "react-router-dom";

import SelectDeck from "./components/common/SelectDeck/SelectDeck";
import ReactModal from "react-modal";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import CommunityDeckRoute from "./routes/CommunityDeck.js";
import ConversationalDeckRoute from "./routes/ConversationalDeck.js";
import SpanishDeckRoute from "./routes/SpanishDeck.js";
import YouthDeckRoute from "./routes/YouthDeck.js";
import LoginPageRoute from "../src/routes/LoginPage/LoginPage.js";
import AdminLoginPage from "../src/routes/AdminLoginPage/AdminLoginPage.js";

import Footer from "../src/components/common/Footer/Footer.js";

// Allows us to serve up the app from any arbitrary directory on a server
const getBasename = path => path.substr(0, path.lastIndexOf("/"));

function App() {
  ReactModal.setAppElement("#root");
  let [statusCode, setStatusCode] = useState(null);

  /*
  useEffect(() => {
    const asyncFunc = async () => {
      try {
        //if(code !== null)
        const data = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://spark4community.com/Digital/${code}`
        );
        console.log("status code: ", data.status);
        setStatusCode(data.status);
      } catch (error) {
        //redirect user to the input code page
        setStatusCode(404);
      }
    };
    asyncFunc();
  }, []);
  */

  return (
    <Router basename={getBasename(window.location.pathname)}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {/*When the app if 1st started, we want the user to be able to select the deck.*/}
            <LoginPageRoute />
          </Route>
          <Route exact path="/AdminLoginPage">
            <AdminLoginPage />
          </Route>
          <Route exact path="/:code">
            <SelectDeck />
          </Route>
          <Route exact path="/:code/CommunityDeck">
            {/*When the community deck is selected, we want to show all of the things the deck should show*/}
            <CommunityDeckRoute />
          </Route>

          <Route exact path="/:code/ConversationalDeck">
            {/*When the conversational deck is selected, we want to show all of the things the deck should show*/}
            <ConversationalDeckRoute />
          </Route>

          <Route exact path="/:code/SpanishDeck">
            {/*When the spanish deck is selected, we want to show all of the things the deck should show*/}

            <SpanishDeckRoute />
          </Route>

          <Route exact path="/:code/YouthDeck">
            {/*When the youth deck is selected, we want to show all of the things the deck should show*/}
            <YouthDeckRoute />
          </Route>
        </Switch>
      </div>
      <Footer />
      {statusCode === 200 && <Redirect to="/" />}
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
