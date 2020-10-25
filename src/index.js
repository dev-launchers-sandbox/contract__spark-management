import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import style from "./styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
  useLocation,
} from "react-router-dom";
import ReactModal from "react-modal";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ReactGA from "react-ga";

import ResetPasswordRoute from "./routes/ResetPasswordRoute.js";
import CommunityDeckRoute from "./routes/CommunityDeck.js";
import ConversationalDeckRoute from "./routes/ConversationalDeck.js";
import ElementaryDeckRoute from "./routes/ElementaryDeck.js";
import SpanishDeckRoute from "./routes/SpanishDeck.js";
import YouthDeckRoute from "./routes/YouthDeck.js";
import LoginPageRoute from "./routes/LoginPageRoute.js";
import AdminLoginRoute from "./routes/AdminLoginRoute.js";
import ForgotPasswordRoute from "./routes/ForgotPasswordRoute.js";
import UserCreationRoute from "./routes/UserCreationRoute.js";
import ManageCodesRoute from "./routes/ManageCodesRoute.js";

import Footer from "../src/components/common/Footer/Footer.js";
import SelectDeck from "./components/common/SelectDeck/SelectDeck";
import { MessagesProvider } from "./useContext/MessagesProvider";

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
    component: AdminLoginRoute,
  },
  {
    path: "/ManageCodes",
    component: ManageCodesRoute,
  },
  {
    path: "/ResetPassword",
    component: ResetPasswordRoute,
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
    path: "/ElementaryDeck",
    component: ElementaryDeckRoute,
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
  return "/Play/"; // TODO: overwriting for now... this sucks
  // TODO: Not a perfect solution, doesn't account for routes that begin with dynamic parameters
  routes.map((entry) => {
    if (entry.path === "/") return;
    let fixedPath = entry.path.split("/:")[0];
    let index = path.indexOf(fixedPath);
    if (index != -1) path = path.substr(0, index);
  });
  return path;
};

function App() {
  ReactModal.setAppElement("#root");

  const init = () => {
    ReactGA.initialize("UA-176718447-1"); // put your tracking id here
  };

  const PageView = () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  };
  useEffect(() => {
    init();
    PageView();
  }, []);

  const [statusCode, setStatusCode] = useState(null);
  const [formCode, setFormCode] = useState("");
  const [username, setUsername] = useState("");

  //Map of all the paths with its correspoding component. Prevents code repetition
  let routeComponents = routes.map(({ path, component }, key) => (
    <Route exact path={path} component={component} key={key} />
  ));

  return (
    <MessagesProvider>
      <Router basename={getBasename(window.location.pathname)}>
        <div className="App">
          <Switch> {routeComponents} </Switch>
        </div>
        {statusCode === 200 && <Redirect to="/" />}
      </Router>
    </MessagesProvider>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
