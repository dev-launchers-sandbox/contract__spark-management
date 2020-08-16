import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import SparkLogo from "../../../images/spark_app_logo_transparent.png";
import axios from "axios";
import { HashRouter as Router, Link } from "react-router-dom";

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
  return (
    <div className={style.Header}>
      <img className={style.sparkLogo} src={SparkLogo} alt="sparkLogo" />
      <h1>{username.toUpperCase()}</h1>
      <Link to="/AdminLoginPage">
        <button>LOG OUT</button>
      </Link>
    </div>
  );
}
export default Header;
