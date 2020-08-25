import React, { useState, useEffect } from "react";
import style from "./ForgotPassword.module.css";
import logo from "../../../images/spark_app_logo_transparent.png";
import axios from "axios";
import PageBody from "../../../components/common/PageBody/PageBody.js";
import notify from "../../../utils/notify.js";

function ForgotPassword() {
  let [form, setForm] = useState({ email: "" });

  //Allows us to have controlled forms. Updates the state of the form as the user types
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
      notify("An email has been sent!");
    } catch (err) {
      notify("Email address is invalid");
    }
  };

  //Gets called whenever the form gets submitted
  const handleSubmit = (events) => {
    //Prevents the page from refreshing after the form submission
    events.preventDefault();
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
