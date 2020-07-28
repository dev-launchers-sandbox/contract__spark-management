import React, { useState, useEffect } from "react";
import style from "./AdminLoginPage.module.css";
import PageBody from "../../components/common/PageBody/PageBody.js";
import logo from "../../images/spark_app_logo_transparent.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";
function AdminLoginPage() {
  let [form, setForm] = useState({ userName: "", password: "" });

  const [redirect, setRedirect] = useState(false);

  const userAccounts = [
    {
      userName: "Alejandro",
      password: 54223
    },
    {
      userName: "Guillermo",
      password: 3333
    }
  ];

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    console.log("func is being called");

    for (let i = 0; i < userAccounts.length; i++) {
      let account = userAccounts[i];
      if (
        form.userName === account.userName &&
        form.password === account.password.toString()
      ) {
        console.log("form username: ", form.userName);
        console.log("form password: ", form.password);
        console.log("account username: ", account.userName);
        console.log("account password: ", account.password);
        console.log("true");
        setRedirect(true);
        break;
      } else {
        console.log("form username: ", form.userName);
        console.log("form password: ", form.password);
        console.log("account username: ", account.userName);
        console.log("account password: ", account.password);
        console.log("false");
        setRedirect(false);
        notify();
        break;
      }
    }
  };

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
                <label>Username:</label>
                <br />
                <input
                  type="text"
                  name="userName"
                  value={form.userName}
                  onChange={handleChange}
                />
                <br />
                <br />
                <label>Password:</label>
                <br />
                <input
                  type="text"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
                <br />
                <div className={style.buttonContainer}>
                  <button className={style.button} onClick={handleSubmit}>
                    Log in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={style.signUpTag}>
          <p>
            Don't have an account? <a href="#example">Sign up</a>
          </p>
        </div>
      </div>
      {redirect ? <Redirect to="/" /> : ""}
    </PageBody>
  );
}
export default AdminLoginPage;
