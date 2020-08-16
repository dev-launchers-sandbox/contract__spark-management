import React, { useState, useEffect } from "react";
import style from "./AdminLoginPage.module.css";
import PageBody from "../../../components/common/PageBody/PageBody.js";
import logo from "../../../images/spark_app_logo_transparent.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";
import RandomQuote from "../../../components/common/RandomQuote/RandomQuote.js";

import HelpButton from "../../../components/common/HelpButton/HelpButton.js";
function AdminLoginPage() {
  let [form, setForm] = useState({ email: "", password: "" });

  const [redirect, setRedirect] = useState(false);

  const [userAccounts, setUserAccounts] = useState([]);



  /*
  //when component mounts get the mock data
  useEffect(() => {
    const getUserData = async () => {
      //gets the response from the get request
      const response = await axios.get("/users");

      //sets the users array that we get from the get request to the userAccounts
      setUserAccounts(response.data.users);
    };
    getUserData();
  }, []);
  */

  //updates state when form is updated
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  //when the log in button is pressed this is called
  const handleSubmit = (event) => {
    //prevents the page from refreshing when submitting
    event.preventDefault();

    checkIfUserExists();
    console.log("func is being called");
  };

  const checkIfUserExists = async () => {
    const userData = {
      email: form.email,
      password: form.password
    };

    try {
      const response = await axios.post("https://api.spark4community.com/login", userData);

      if (response.status === 200) {
        setRedirect(true);
      }
      console.log("user response: ", response);
    } catch (err) {
      console.error("error posting user data: ", err);
      notify();
    }
  };

  //gets called when the user inputs the wrong username and password
  const notify = () => {
    toast("Account doesn't exist", {
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



  return (
    <PageBody>
      <div className={style.adminLoginPage}>

        <div className={style.loginContainer}>
          <div className={style.loginPopup}>
            <img className={style.logo} src={logo} alt="logo" />
            <div className={style.formContainer}>
              <form>
                <label
                  style={{
                    fontFamily: "Sue Ellen Francisco",
                    fontWeight: "normal"
                  }}
                >
                  Email:
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                <br />
                <label
                  style={{
                    fontFamily: "Sue Ellen Francisco",
                    fontWeight: "normal"
                  }}
                >
                  Password:
                </label>
                <br />
                <div className={style.passwordContainer}>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>
                <br />
                <div className={style.buttonContainer}>
                  <button className={style.button} onClick={handleSubmit}>
                    Log in
                  </button>
                </div>
              </form>
              <div className={style.forgotPasswordText}>
                <p style={{fontFamily: "nunito sans", fontSize: "1rem"}}>Forgot password? <Link className={style.forgotPasswordLink} to="/ForgotPassword">Click Here</Link></p>
              </div>
            </div>
          </div>
        </div>
        <RandomQuote />
        <HelpButton />
      </div>
      {/*if true redirect the user to the main page */}
      {redirect && <Redirect to="/ManageCodes" />}
    </PageBody>
  );
}
export default AdminLoginPage;
