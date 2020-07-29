import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./LoginPage.module.css";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import EULAModal from "../../components/common/EULAModal/EULAModal.js";
import PageBody from "../../components/common/PageBody/PageBody.js";
import Logo from "../../components/common/Logo/Logo.js";
import SelectDeck from "../../components/common/SelectDeck/SelectDeck.js";
import LoadingOverlay from "react-loading-overlay";
import RandomQuote from "../../components/common/RandomQuote/RandomQuote.js";
import sparkLogo from "../../images/spark_app_logo_transparent.png";

function LoginPage(props) {
  let [form, setForm] = useState({ code: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [deckUsing, setDeckUsing] = useState(
    ""
  ); /*
  const [showingQuote, setShowingQuote] = useState("Error Quote");

  useEffect(() => {
    //for some reason I could not get it to work in state
    let quoteArray = ["Quote 0", "Quote 1", "Quote 2"];
    let indexOfQuote = Math.floor(Math.random() * quoteArray.length);
    console.log("index = ", indexOfQuote);
    setShowingQuote(quoteArray[indexOfQuote]);
    console.log(quoteArray[indexOfQuote]);
  }, []);
  */
  //it's called when users inputs data into the form
  const handleChange = event => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  //gets called when enter button is clicked
  const handleClick = event => {
    //prevens page from reloading when pressing the button
    event.preventDefault();
    //sets is loading to true
    setIsLoading(true);
    //verifies the code the user submits and redirects them depending on the status code
    verifyCode();
  };

  //gets called when the user submits the wrong code
  const notify = () => {
    toast("You entered the wrong code", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
      className: css({
        background: "white"
      }),
      bodyClassName: css({
        fontSize: "20px",
        color: "black"
      }),
      progressClassName: css({
        background: "repeating-radial-gradient( transparent, transparent )"
      })
    });
  };
  const verifyIfSelection = async () => {
    try {
      const link = `https://cors-anywhere.herokuapp.com/https://spark4community.com/Digital/${
        form.code
      }/`;
      //sets isLoading to false
      const data = await axios.get(link);
      sessionStorage.setItem(form.code, true);
      setDeckUsing("");
      setIsLoading(false);
      if (data.status === 200) {
        return setStatusCode("specialCase");
      }
    } catch (err) {
      //notifies the user that they have submitted the wrong code
      console.log(err);
      notify();
      setIsLoading(false);
      setForm({
        ...form,
        code: ""
      });
    }
  };
  //verifies the code the user submits and redirects them depending on the status code
  const verifyCode = async () => {
    let deckLetter = form.code.charAt(0);
    let codeWithoutDeckLetter = form.code.substring(1);
    try {
      //stores the url and the code the user inputs without the letter of the deck on top
      const link = `https://cors-anywhere.herokuapp.com/https://spark4community.com/Digital/${codeWithoutDeckLetter}/`;
      //gets the response data from the url using a GET request
      const data = await axios.get(link);
      console.log("status code: ", data.status);
      //marks the code as verified and saves it in sessionStorage
      sessionStorage.setItem(form.code.substring(1), true);
      //props.correctDeck(deckLetter);
      //sets isLoading to false
      if (deckLetter === "c") {
        setDeckUsing("CommunityDeck/");
      } else if (deckLetter === "s") {
        setDeckUsing("SpanishDeck/");
        console.log("spanish");
      } else if (deckLetter === "o") {
        setDeckUsing("ConversationalDeck/");
      } else if (deckLetter === "y") {
        setDeckUsing("YouthDeck/");
      } else {
        setForm({
          ...form,
          code: ""
        });
        setIsLoading(false);
        notify();
        return;
      }
      setIsLoading(false);
      /*checks if the status from the GET request was a succes
        If it was a succes then it will set statusCode to 200
      */
      if (data.status === 200) {
        setStatusCode(200);
      }
      //props.correctDeck(deckLetter);
    } catch (error) {
      verifyIfSelection();
      console.log("error here");
    }
  };
  toast.configure();
  return (
    <LoadingOverlay active={isLoading} spinner text="Verifying Code...">
      <PageBody>
        <div className={style.loginPage}>
          <EULAModal />
          <div className={style.brandedLogo}>
            <img className={style.sparkLogo} src={sparkLogo} alt="logo" />
          </div>

          <h1 style={{ fontFamily: "Sue Ellen Francisco" }}>
            READY TO S.P.A.R.K A CONNECTION?
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
                  placeholder="code"
                  onChange={handleChange}
                />
              </div>
              <div className={style.buttonContainer}>
                <button className={style.button} onClick={handleClick}>
                  enter
                </button>
              </div>
            </form>
          </div>

          {/*If the status code is 200 redirect the user to the game with the code they submitted */}
          {statusCode === 200 ? (
            <Redirect to={`/${form.code.substring(1)}/${deckUsing}`} />
          ) : (
            ""
          )}
          {statusCode === "specialCase" ? (
            <Redirect to={`/${form.code}/`} />
          ) : (
            ""
          )}

          <RandomQuote />
        </div>
      </PageBody>
    </LoadingOverlay>
  );
}

export default LoginPage;