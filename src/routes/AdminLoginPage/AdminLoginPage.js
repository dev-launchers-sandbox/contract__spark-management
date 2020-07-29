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

  const [userAccounts, setUserAccounts] = useState([]);

  useEffect(() => {
    const getMockData = async () => {
      //gets the response from the get request
      const response = await axios.get("/users");

      //sets the users array that we get from the get request to the userAccounts
      setUserAccounts(response.data.users);
    };
    getMockData();
  }, []);

  //updates state when form is updated
  const handleChange = event => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  //when the log in button this is called
  const handleSubmit = event => {
    //prevents the page from refreshing when submitting
    event.preventDefault();

    checkIfUserExists();
    console.log("func is being called");
  };

  const checkIfUserExists = () => {
    /*
     loops through the userAccounts array and checks if the username
     and password the user inputted equals the username and password in the array
    */
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
        return;
      }
    }
    //notifies the user if they inputted the wrong username and password
    notify();
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
                <label>Username:</label>
                <br />
                <input
                  type="text"
                  name="userName"
                  value={form.userName}
                  onChange={handleChange}
                />
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
      </div>
      {/*if true redirect the user to the main page */}
      {redirect ? <Redirect to="/" /> : ""}
    </PageBody>
  );
}
export default AdminLoginPage;
