import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import style from "./styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
  useRouterHistory
} from "react-router-dom";
//comment
import SelectDeck from "./components/common/SelectDeck/SelectDeck";
import ReactModal from "react-modal";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import CommunityDeckRoute from "./routes/CommunityDeck.js";
import ConversationalDeckRoute from "./routes/ConversationalDeck.js";
import SpanishDeckRoute from "./routes/SpanishDeck.js";
import YouthDeckRoute from "./routes/YouthDeck.js";
import LoginPageRoute from "./pages/LoginPage/LoginPage";
import AdminLoginPage from "./pages/AdminPortal/AdminLoginPage/AdminLoginPage";
//import mockData from "../src/mockData/MockData.js";
import ManageCodesPage from "./pages/AdminPortal/ManageCodesPage/ManageCodesPage";

import Footer from "../src/components/common/Footer/Footer.js";

// Allows us to serve up the app from any arbitrary directory on a server
const getBasename = (path) => path.substr(0, path.lastIndexOf("/"));

function App() {
  ReactModal.setAppElement("#root");
  let [statusCode, setStatusCode] = useState(null);
  let [formCode, setFormCode] = useState("");

  const changeFormCode = (formCodeVal) => {
    setFormCode(formCodeVal);
    console.log("form code (inside a function): ", formCodeVal);
    console.log("form code (inside a function): ", formCode);
  };
  console.log("form code (outside a function): ", formCode);

  //creates the mock requests
  //mockData();

  console.log("subdirectory: ", getBasename(window.location.pathname));
  console.log("window: ", window.location.pathname);

  return (
    <Router basename={getBasename(window.location.pathname)}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {/*When the app if 1st started, we want the user to be able to select the deck.*/}
            <LoginPageRoute changeFormCode={changeFormCode} />
          </Route>
          <Route exact path="/AdminLoginPage">
            <AdminLoginPage />
          </Route>
          <Route exact path="/ManageCodes">
            <ManageCodesPage />
          </Route>
          <Route exact path="/:code">
            <SelectDeck />
          </Route>
          <Route exact path="/:code/CommunityDeck">
            {/*When the community deck is selected, we want to show all of the things the deck should show*/}
            <CommunityDeckRoute code={formCode} />
          </Route>

          <Route exact path="/:code/ConversationalDeck">
            {/*When the conversational deck is selected, we want to show all of the things the deck should show*/}
            <ConversationalDeckRoute code={formCode} />
          </Route>

          <Route exact path="/:code/SpanishDeck">
            {/*When the spanish deck is selected, we want to show all of the things the deck should show*/}

            <SpanishDeckRoute code={formCode} />
          </Route>

          <Route exact path="/:code/YouthDeck">
            {/*When the youth deck is selected, we want to show all of the things the deck should show*/}
            <YouthDeckRoute code={formCode} />
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
