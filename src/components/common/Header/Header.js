import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import SparkLogo from "../../../images/spark_app_logo_transparent.png";
import axios from "axios";
import { HashRouter as Router, Link, Redirect } from "react-router-dom";

function Header() {
  const [username, setUsername] = useState("");
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
  const logout = () => {
    axios.post("https://api.spark4community.com/logout").then((res) => {
      setDoRedirect(true); // redirect back to login page when we get a response from the server
    });
  };

  return (
    <div className={style.Header}>
      // Needed to allow us to programmatically redirect
      {doRedirect ? <Redirect to="/AdminLoginPage" /> : ""}
      // Actual visual body:
      <img className={style.sparkLogo} src={SparkLogo} alt="sparkLogo" />
      <h1>{username.toUpperCase()}</h1>
      <button onClick={logout}>LOG OUT</button>
    </div>
  );
}
export default Header;
