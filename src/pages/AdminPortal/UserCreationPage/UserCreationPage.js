import React, { useState, useEffect } from "react";
import style from "./UserCreationPage.module.css";
import PageBody from "../../../components/common/PageBody/PageBody.js";
import logo from "../../../images/spark_app_logo_transparent.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../../components/common/notify/notify.js"
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
import RandomQuote from "../../../components/common/RandomQuote/RandomQuote.js";

function UserCreationPage() {
  let [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });

  //Allows us to have controlled forms. Updates the state of the form as the user types
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //Sends a post request to the server, which will create a new user with the data provided.
  const userCreationRequest = async () => {
    const userData = {
      email: form.email,
      password: form.password,
      full_name: form.fullName,
      user_type: "super",
    };
    if (form.password !== form.confirmPassword) {
      //This makes sure they didn’t mistype their password
      return notify("Passwords need to match");
    }

    if (form.password === "" || form.confirmPassword === "") {
      //They must submit a password for the new user.
      return notify("Password can't be empty");
    }
    try {
      const response = await axios.post(
        "https://api.spark4community.com/signup",
        userData,
        { withCredentials: true }
      );
      notify("User has been created!");
    } catch (err) {
      console.error("There was an error while creating the new user: ", err);
      notify("This account already exists!");
    }
  };

  //Gets called whenever the form gets submitted
  const handleSubmit = (event) => {
    //Prevents the page from refreshing after the form submission
    event.preventDefault();
    userCreationRequest();
  };

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
                  style={{ width: "100%" }}
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
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className={style.manaCodesButtonContainer}
          style={{ marginTop: "2%" }}
        >
          <Link to="/ManageCodes">
            <button className={style.manageCodesButton}>Go back</button>
          </Link>
        </div>
        <RandomQuote />
      </div>
      {/*if true redirect the user to the manage codes page */}
    </PageBody>
  );
}
export default UserCreationPage;
