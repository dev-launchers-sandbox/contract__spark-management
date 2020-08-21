import React, { useEffect, useState } from "react";
import style from "./ResetPassword.module.css";
import logo from "../../../images/spark_app_logo_transparent.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../../components/common/notify/notify.js"
import { css } from "glamor";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation,
  Redirect,
  useRouterHistory,
} from "react-router-dom";

toast.configure();

function ResetPassword() {
  const [token, setToken] = useState();

  useEffect(() => {
    //Sets the user token to the token provided in the URL, to allow us to reset its password
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let urlToString = urlParams.toString();
    setToken(urlToString.substr(6));
  }, []);

  const [form, setForm] = useState({
    newPassword: "",
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

  //Gets called whenever the form gets submitted
  const handleSubmit = async (event) => {
    //Prevents the page from reloading after the form submission
    event.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      //This makes sure they didn’t mistype their password
      return notify("Passwords do not match");
    }
    if (!form.newPassword.replace(/\s/g, "").length) {
      //They must submit a password for the new user.
      return notify("You must introduce a password");
    }
    let newInfo = {
      token: token,
      password: form.newPassword,
      verifiedPassword: form.confirmPassword,
    };
    console.log(newInfo.password);
    try {
      //Makes the post req. to the server sending the new user data.
      await axios.post(
        "https://api.spark4community.com/reset-password",
        newInfo
      );
      notify("The password reset was successfull!");
    } catch (error) {
      //If it did not find a user with token this code will run.
      alert("There was an error! Try again or come back in a few minutes");
    }
  };

  return (
    <div className={style.resetPassword}>
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
                NEW PASSWORD:
              </label>
              <br />
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
              />
              <br />
              <label
                style={{
                  fontFamily: "Sue Ellen Francisco",
                  fontWeight: "normal",
                }}
              >
                CONFIRM PASSWORD:
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
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
