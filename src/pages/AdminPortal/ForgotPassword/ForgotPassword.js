import React, { useState, useEffect } from "react";
import style from "./ForgotPassword.module.css";
import logo from "../../../images/spark_app_logo_transparent.png";
import axios from "axios";
import PageBody from "../../../components/common/PageBody/PageBody.js";
import notify from "../../../components/common/notify/notify.js"

function ForgotPassword() {
  let [form, setForm] = useState({ email: "" });

  //updates state when form is updated
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const sendForgotPassword = async () => {
    try {
      const response = await axios.post(
        "https://api.spark4community.com/forgot-password",
        { email: form.email }
      );
      console.log("forgot password: ", response);
      notify("An email has been sent!");
    } catch (err) {
      console.error(err);
      notify("Email address is invalid");
    }
  };

  const handleSubmit = (events) => {
    //prevents page from refreshing
    events.preventDefault();
    //sends forgotpassword
    sendForgotPassword();
  };

  return (
    <PageBody>
      <div className={style.forgotPassword}>
        <div className={style.loginContainer}>
          <div className={style.loginPopup}>
            <div className={style.imageHolder}>
              <img className={style.logo} src={logo} alt="logo" />
            </div>
            <div className={style.formContainer}>
              <form onSubmit={handleSubmit}>
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
                  onChange={handleChange}
                  value={form.value}
                />
                <div className={style.buttonContainer}>
                  <button className={style.button} type="submit">
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageBody>
  );
}

export default ForgotPassword;
