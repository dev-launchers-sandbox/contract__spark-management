import React, { useEffect, useState } from "react";
import style from "./ResetPassword.module.css";
import logo from "../../../images/spark_app_logo_transparent.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  let { token } = useParams();
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      return notify("Passwords do not match");
    }
    if (form.newPassword == "" || form.confirmPassword === "") {
      return notify("You must introduce a password");
    }
    let newInfo = {
      token: token,
      password: form.newPassword,
      verifiedPassword: form.confirmPassword,
    };
    try {
      axios.post("https://api.spark4community.com/reset-password", newInfo);
    } catch (error) {
      alert("There was an error! Try again or come back in a few minutes");
    }
  };
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
  return (
    <div className={style.resetPassword}>
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
