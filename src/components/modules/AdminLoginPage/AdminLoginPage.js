import React, { useState, useEffect } from "react";
import style from "./AdminLoginPage.module.css";
import PageBody from "../../../components/common/PageBody/PageBody.js";
import logo from "../../../images/spark_app_logo_transparent.png";
import axios from "axios";
import notify from "../../../components/common/notify/notify.js";
import MockAdapter from "axios-mock-adapter";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect,
} from "react-router-dom";
import RandomQuote from "../../../components/common/RandomQuote/RandomQuote.js";

import HelpButton from "../../../components/common/HelpButton/HelpButton.js";
function AdminLoginPage() {
  let [form, setForm] = useState({ email: "", password: "" });

  const [redirect, setRedirect] = useState(false);

  const [userAccounts, setUserAccounts] = useState([]);

  //Whenever the AdminLoginPage, try getting the current user, to be able to redirect to ManageCodes if needed.
  useEffect(() => {
    async function checkIfUserLoggedIn() {
      try {
        await axios.get("https://api.spark4community.com/users/current");
        setRedirect(true);
      } catch (error) {
        // If they are not logged in, it will reach the catch block
      }
    }
    checkIfUserLoggedIn(); //Call the async function
  }, []);

  //Allows us to have controlled forms. Updates the state of the form as the user types
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //Gets called whenever the form gets submitted
  const handleSubmit = (event) => {
    //Prevents the page from refreshing after the form submission
    event.preventDefault();
    checkIfUserExists();
  };

  //Checks if the info provided matches to a user. If it does, we give the user access to it.
  const checkIfUserExists = async () => {
    const userData = {
      email: form.email,
      password: form.password,
    };

    try {
      const response = await axios.post(
        "https://api.spark4community.com/login",
        userData,
        { withCredentials: true }
      );
      // If the info provided is correct, allow the redirect to /ManageCodes
      if (response.status === 200) {
        setRedirect(true);
        notify("Logged in");
      }
    } catch (err) {
      //Notifies the user that the info provided is incorrect
      notify("This account doesn't exist");
    }
  };
  //LoginPageRoute
  return (
    <PageBody>
      <div className={style.adminLoginPage}>
        <div className={style.loginContainer}>
          <div className={style.loginPopup}>
            <div className={style.imageHolder}>
              <img className={style.logo} src={logo} alt="logo" />
            </div>
            <div className={style.formContainer}>
              <form>
                <div className={style.emailContainer}>
                  <label
                    style={{
                      fontFamily: "Sue Ellen Francisco",
                      fontWeight: "normal",
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
                </div>
                <br />
                <label
                  style={{
                    fontFamily: "Sue Ellen Francisco",
                    fontWeight: "normal",
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
                <p style={{ fontFamily: "nunito sans", fontSize: "1rem" }}>
                  Forgot password?{" "}
                  <Link
                    className={style.forgotPasswordLink}
                    to="/ForgotPassword"
                  >
                    Click Here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <RandomQuote />
      </div>
      {/*If true, meaning the user is logged in, redirect to ManageCodes*/}
      {redirect && <Redirect to="/ManageCodes" />}
    </PageBody>
  );
}
export default AdminLoginPage;
