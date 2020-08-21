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
import UserCreationRoute from "./pages/UserCreationPage/UserCreationPage.js";

//import mockData from "../src/mockData/MockData.js";

import ManageCodesPage from "./pages/AdminPortal/ManageCodesPage/ManageCodesPage";
import Footer from "../src/components/common/Footer/Footer.js";
import SelectDeck from "./components/common/SelectDeck/SelectDeck";

// Change axios defaults, to fix cookies being sent (may need a better solution)
axios.defaults.withCredentials = true;

// An Array of all the routes, so we can use it in getBasename()
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
    path: "/CreateNewUser",
    component: UserCreationRoute,
  },
  {
    path: "/CommunityDeck",
    component: CommunityDeckRoute,
  },
  {
    path: "/ConversationalDeck",
    component: ConversationalDeckRoute,
  },
  {
    path: "/SpanishDeck",
    component: SpanishDeckRoute,
  },
  {
    path: "/YouthDeck",
    component: YouthDeckRoute,
  },
  {
    path: "/ForgotPassword",
    component: ForgotPasswordRoute,
  },
];
const getBasename = (path) => {
  // TODO: Not a perfect solution, doesn't account for routes that begin with dynamic parameters
  routes.map((entry) => {
    if (entry.path === "/") return;
    let index = path.lastIndexOf(entry.path);
    if (index != -1) path = path.substr(0, path.lastIndexOf(entry.path));
  });
  return path;
};

function App() {
  ReactModal.setAppElement("#root");
  let [statusCode, setStatusCode] = useState(null);
  let [formCode, setFormCode] = useState("");

  //Map of all the paths with its correspoding component. Prevents code repetition
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
