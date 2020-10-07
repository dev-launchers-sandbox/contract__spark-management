import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import sparkLogo from "../../../images/spark_app_logo_transparent.png";
import axios from "axios";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

function Header() {
  const [username, setUsername] = useState("");

  //Whenever the page loads, we want to get the current user to show it in the header
  useEffect(() => {
    const fetchUser = async () => {
      let userUsername = await axios.get(
        "https://api.spark4community.com/users/current"
      );
      setUsername(userUsername.data.full_name);
    };
    fetchUser();
  });

  // Logout logic
  const [doRedirect, setDoRedirect] = React.useState(false);

  //Logs the user out of their account
  const logout = () => {
    axios.post("https://api.spark4community.com/logout").then((res) => {
      setDoRedirect(true); // redirect back to login page when we get a response from the server
    });
  };

  return (
    <div className={style.Header}>
      {/*} Needed to allow us to programmatically redirect{*/}
      {doRedirect ? <Redirect to="/AdminLoginPage" /> : ""}
      {/*}Actual visual body: {*/}
      <img className={style.sparkLogo} src={sparkLogo} alt="sparkLogo" />
      <h1>{username.toUpperCase()}</h1>
      <a
        style={{ textDecoration: "none", fontWeight: "bold" }}
        onClick={logout}
      >
        🚪 Log Out
      </a>
    </div>
  );
}
export default Header;
