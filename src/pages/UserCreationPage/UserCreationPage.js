import React, { useState, useEffect } from "react";
import style from "./UserCreationPage.module.css";
import PageBody from "../../components/common/PageBody/PageBody.js";
import logo from "../../images/spark_app_logo_transparent.png";
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
  Redirect,
} from "react-router-dom";
import RandomQuote from "../../components/common/RandomQuote/RandomQuote.js";

function UserCreationPage() {
  let [form, setForm] = useState({ email: "", password: "", fullName: "", confirmPassword: "" });

  const [redirect, setRedirect] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //gets called when the user inputs the wrong username and password
  const notify = (text) => {
    toast(text, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
      className: css({
        background: "white",
      }),
      bodyClassName: css({
        fontSize: "20px",
        color: "black",
      }),
      progressClassName: css({
        background: "repeating-radial-gradient( transparent, transparent )",
      }),
    });
  };

  const userCreationRequest = async () => {
    const userData = {
      email: form.email,
      password: form.password,
      full_name: form.fullName,
      user_type: "super"
    };
    if(form.password !== form.confirmPassword){
      return notify("Passwords need to match")
    }

    if(form.password === "" || form.confirmPassword === ""){
      return notify("Password can't be empty")
    }

    try {
      const response = await axios.post(
        "https://api.spark4community.com/signup",
        userData,
        { withCredentials: true }
      );
      notify("User has been created!")

      console.log("user response: ", response);
    } catch (err) {
      console.error("error posting user data: ", err);
      notify("Account already exists");
    }
  };


  //when the log in button is pressed this is called
  const handleSubmit = (event) => {
    //prevents the page from refreshing when submitting
    event.preventDefault();

    userCreationRequest();
    console.log("func is being called");
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
                <br />
                <label
                  style={{
                    fontFamily: "Sue Ellen Francisco",
                    fontWeight: "normal",
                  }}
                >
                  Full Name:
                </label>
                <br />
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  style={{width: "100%"}}
                  onChange={handleChange}
                />
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
                <label
                  style={{
                    fontFamily: "Sue Ellen Francisco",
                    fontWeight: "normal",
                  }}
                >
                  Confirm Password:
                </label>
                <br />
                <div className={style.passwordContainer}>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
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
                <Link to="/ManageCodes" className={style.forgotPasswordLink}>Go back to ManageCodes page</Link>
              </div>
            </div>
          </div>
        </div>

        <RandomQuote />
      </div>
      {/*if true redirect the user to the main page */}
      {redirect && <Redirect to="/ManageCodes" />}
    </PageBody>
  );
}
export default UserCreationPage;
