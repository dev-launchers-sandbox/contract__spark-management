import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import style from "./styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
  useRouterHistory,
} from "react-router-dom";
import ReactModal from "react-modal";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import ResetPassword from "./pages/AdminPortal/ResetPassword/ResetPassword";
import CommunityDeckRoute from "./routes/CommunityDeck.js";
import ConversationalDeckRoute from "./routes/ConversationalDeck.js";
import SpanishDeckRoute from "./routes/SpanishDeck.js";
import YouthDeckRoute from "./routes/YouthDeck.js";
import LoginPageRoute from "./pages/LoginPage/LoginPage";
import AdminLoginPage from "./pages/AdminPortal/AdminLoginPage/AdminLoginPage";
import ForgotPasswordRoute from "./pages/AdminPortal/ForgotPassword/ForgotPassword.js";
//import mockData from "../src/mockData/MockData.js";

import ManageCodesPage from "./pages/AdminPortal/ManageCodesPage/ManageCodesPage";
import Footer from "../src/components/common/Footer/Footer.js";
import SelectDeck from "./components/common/SelectDeck/SelectDeck";

// Change axios defaults, to fix cookies being sent (may need a better solution)
axios.defaults.withCredentials = true;

// Allows us to serve up the app from any arbitrary directory on a server
let routes = [
  {
    path: "/",
    component: LoginPageRoute,
  },
  {
    path: "/AdminLoginPage",
    component: AdminLoginPage,
  },
  {
    path: "/ManageCodes",
    component: ManageCodesPage,
  },
  {
    path: "/ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/:code/CommunityDeck",
    component: CommunityDeckRoute,
  },
  {
    path: "/:code/ConversationalDeck",
    component: ConversationalDeckRoute,
  },
  {
    path: "/:code/SpanishDeck",
    component: SpanishDeckRoute,
  },
  {
    path: "/:code/YouthDeck",
    component: YouthDeckRoute,
  },
  {
    path: "/ForgotPassword",
    component: ForgotPasswordRoute,
  },
];
const getBasename = (path) => {
  // TODO: Not a perfect solution, doesn't account for routes that begin with dynamic parameters
  path = path.substr(0, path.lastIndexOf("/"));
  routes.map((entry) => {
    path = path.substr(0, path.lastIndexOf(entry.path));
  });
  return path;
};

function App() {
  ReactModal.setAppElement("#root");
  let [statusCode, setStatusCode] = useState(null);
  let [formCode, setFormCode] = useState("");

  console.log("form code (outside a function): ", formCode);

  //creates the mock requests
  //mockData();

  console.log("subdirectory: ", getBasename(window.location.pathname));
  console.log("window: ", window.location.pathname);
  //
  let routeComponents = routes.map(({ path, component }, key) => (
    <Route exact path={path} component={component} key={key} />
  ));

  return (
    <Router basename={getBasename(window.location.pathname)}>
      <div className="App">
        <Switch> {routeComponents} </Switch>
      </div>
      <Footer />
      {statusCode === 200 && <Redirect to="/" />}
    </Router>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
