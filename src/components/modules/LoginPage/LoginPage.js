import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import style from "./LoginPage.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect,
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import EULAModal from "./EULAModal/EULAModal.js";
import PageBody from "../../../components/common/PageBody/PageBody.js";
import Logo from "../../../components/common/Logo/Logo.js";
import SelectDeck from "../../../components/common/SelectDeck/SelectDeck.js";
import LoadingOverlay from "react-loading-overlay";
import notify from "../../../utils/notify.js";
import sendEvent from "../../../utils/sendEvent.js";
import RandomQuote from "../../../components/common/RandomQuote/RandomQuote.js";
import sparkLogo from "../../../images/spark_app_logo_transparent.png";

function LoginPage(props) {
  let [form, setForm] = useState({ code: "", username: "" });

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [deckUsing, setDeckUsing] = useState("");

  //Allows us to have controlled forms. Updates the state of the form as the user types
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //Starts the process of code verification
  const handleSubmit = (event) => {
    //Prevents the page from refreshing after the form submission
    event.preventDefault();

    //Removes all tabs and white spaces and checks if the username is empty (length of 0)
    if (!form.username.replace(/\s/g, "").length) {
      return notify("Please input a valid username");
    }

    if (form.username.length > 45) {
      return notify("Usernames must be 45 or less characters");
    }

    sessionStorage.setItem("username", form.username);
    setIsLoading(true); //Lets the user know their code is being processed
    verifyCode();
  };

  //Verifies that the code inputted exists, and redirects the user to the correct game.
  const verifyCode = async () => {
    try {
      //Sends a request to the server to verify the code.
      const data = await axios.get(
        `https://api.spark4community.com/codes/${form.code}/validate`
      );
      // Gets all the code data to be able to send the user to the correct game.
      const codeData = await axios.get(
        `https://api.spark4community.com/codes/${form.code}`
      );

      //!IMPORTANT Only verified codes will get to this point

      sessionStorage.setItem(form.code, true); //Marks the code as verified
      //Sets the deck using to later redirect to it
      let uppercaseDeckName =
        codeData.data.code.deck_name.charAt(0).toUpperCase() +
        codeData.data.code.deck_name.slice(1);
      setDeckUsing(uppercaseDeckName.concat("Deck"));
      setIsLoading(false);

      //Verifies that the code is not expired and allows for the redirect to happen
      if (data.data.valid) {
        setRedirect(true);
        sendEvent("Student Login", "student login button clicked", "button");
      } else {
        setForm({
          ...form,
          code: "",
        });
        setIsLoading(false);
        notify("This code has expired! Purchase a new license at the website!");
      }
    } catch (error) {
      // All invalid codes will reach this endpoint
      setForm({
        ...form,
        code: "",
      });
      setIsLoading(false);
      notify("This code does not exist!");
    }
  };

  toast.configure();
  return (
    <LoadingOverlay active={isLoading} spinner text="Verifying Code...">
      <PageBody>
        <div className={style.loginPage}>
          <EULAModal />
          <div className={style.brandedLogo}>
            <a
              href="https://spark4community.com/2052-2/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className={style.sparkLogo} src={sparkLogo} alt="logo" />
            </a>
          </div>

          <h1 style={{ fontFamily: "Sue Ellen Francisco" }}>
            READY TO SPARK A CONNECTION?
          </h1>
          <br />
          <div className={style.headerText}>
            <h2 style={{ fontFamily: "Sue Ellen Francisco" }}>
              {" "}
              ENTER YOUR UNIQUE CODE{" "}
            </h2>
          </div>

          <div className={style.codeContainer}>
            <form>
              <div className={style.inputContainer}>
                <input
                  type="text"
                  name="code"
                  value={form.code}
                  style={{ width: "19.5em" }}
                  placeholder="code"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  style={{ width: "19.5em" }}
                  placeholder="username"
                  onChange={handleChange}
                />
              </div>
              <div className={style.buttonContainer}>
                <button className={style.button} onClick={handleSubmit}>
                  enter
                </button>
              </div>
              <div className={style.contactLink}>
                <p>
                  Do you need help?{" "}
                  <a
                    href="https://spark4community.com/apphelp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={style.classLink}
                  >
                    Contact us
                  </a>
                </p>
              </div>
            </form>
            <RandomQuote />

            <div className={style.blurbText}>
              <p>
                New to this site and/or don't have a code?{" "}
                <a
                  href="https://spark4community.com/2052-2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.link}
                >
                  Learn more about the S.P.A.R.K. App® here
                </a>{" "}
                and/or{" "}
                <a
                  href="https://spark4community.com/digital-deck-waitlist/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.link}
                  onClick={() => {
                    sendEvent("Waitlist", "Waitlist link clicked", "link");
                  }}
                >
                  get on our waitlist
                </a>{" "}
                to partner with us and purchase your license in the fall/winter
                of 2020!
              </p>
            </div>
          </div>
          {/*If it is true then it will redirect the user to the game with the code they submitted */}
          {redirect ? <Redirect to={`/${deckUsing}?code=${form.code}`} /> : ""}
        </div>
      </PageBody>
    </LoadingOverlay>
  );
}

export default LoginPage;
