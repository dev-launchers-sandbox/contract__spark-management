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
import HelpButton from "../../components/common/HelpButton/HelpButton.js";


function LoginPage(props) {
  let [form, setForm] = useState({ code: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [deckUsing, setDeckUsing] = useState("");


  //it's called when users inputs data into the form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };



  //gets called when enter button is clicked
  const handleClick = (event) => {
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
      const link = `https://cors-anywhere.herokuapp.com/https://spark4community.com/Digital/${form.code}/`;
      //sets isLoading to false
      const data = await axios.get(`http://192.232.212.61:8080/codes/${form.code}/validate`);
      console.log("spark data: ", data);
      sessionStorage.setItem(form.code, true);
      setDeckUsing("");
      setIsLoading(false);
      if (data.data.valid) {
        return setRedirect("specialCase");
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
      const data = await axios.get(`http://192.232.212.61:8080/codes/${form.code}/validate`);
      console.log("status code: ", data.status);

      const codeData = await axios.get(`http://192.232.212.61:8080/codes/${form.code}`);
        console.log("code data in login page: ", codeData)
      //marks the code as verified and saves it in sessionStorage
      sessionStorage.setItem(form.code, true);
      //props.correctDeck(deckLetter);
      //sets isLoading to false

      if (codeData.data.code.deck_name === "community") {
        setDeckUsing("CommunityDeck");
      } else if (codeData.data.code.deck_name === "spanish") {
        setDeckUsing("SpanishDeck");
        console.log("spanish");
      } else if (codeData.data.code.deck_name === "conversational") {
        setDeckUsing("ConversationalDeck");
      } else if (codeData.data.code.deck_name === "youth") {
        setDeckUsing("YouthDeck");
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
      if (data.data.valid) {
        setRedirect(true);
        props.changeFormCode(form.code);
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
                  placeholder="code"
                  onChange={handleChange}
                />
              </div>
              <div className={style.buttonContainer}>
                <button className={style.button} onClick={handleClick}>
                  enter
                </button>
              </div>
              <div className={style.contactLink}>
                <p>
                  Do you need help?{" "}
                  <a
                    href="https://spark4community.com/contact/"
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
                  Learn more about the S.P.A.R.K. App™ here
                </a>{" "}
                and/or{" "}
                <a
                  href="https://spark4community.com/digital-deck-waitlist/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.link}
                >
                  get on our waitlist
                </a>{" "}
                to partner with us and purchase your license in the fall/winter
                of 2020!
              </p>
            </div>
          </div>
          {/*If the status code is 200 redirect the user to the game with the code they submitted */}
          {redirect ? (
            <Redirect to={`/${form.code}/${deckUsing}`} />
          ) : (
            ""
          )}
          {redirect === "specialCase" ? <Redirect to={`/${form.code}`} /> : ""}
        </div>
      </PageBody>
    </LoadingOverlay>
  );
}

export default LoginPage;
