import React, { useState, useEffect } from "react";
import style from "./Logo.module.css";

import redLogo from "../../../images/spark_app_logo_transparent.png";
import { Link, useParams } from "react-router-dom";
import BrandedLogo from "../../../images/mcneil-logo.png";
import axios from "axios";
import queryString from "query-string";
export default function Logo(props) {
  const [doesImageExist, setDoesImageExist] = useState(true);
  const [logoUrl, setLogoUrl] = useState(null);
  const [code, setCode] = useState("None");

  useEffect(() => {
    let query = window.location.search;
    try {
      const queryParsed = queryString.parse(query);
      setCode(queryParsed.code);
    } catch (error) {}
  }, []);

  useEffect(() => {
    const getClientLogoUrl = async () => {
      try {
        const response = await axios.get(
          `https://api.spark4community.com/codes/${code}/validate`
        );
        setLogoUrl(response.data.logo_url);
      } catch (err) {
        console.error("this is the error", err);
      }
    };
    getClientLogoUrl();
    //return () => mounted = false;
  }, [code]);

  const addDefaultSrc = (event) => {
    event.target.src = null;
    setDoesImageExist(false);
  };
  // Logo Component and text underneath it.
  return (
    <div
      className={style.logo}
      style={{ marginTop: props.marginTop, marginLeft: "2.5em" }}
    >
      <div className={style.brandedLogoContainer}>
        <a
          href="https://spark4community.com/2052-2/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={
              process.env.PUBLIC_URL + "/images/spark_app_logo_transparent.png"
            }
            className={style.sparkLogo}
            alt="Logo"
          />
        </a>

        {doesImageExist ? (
          <p className={style.brandedLogoText}>IN PARTNERSHIP WITH</p>
        ) : (
          ""
        )}
        {doesImageExist ? (
          <Link to={`/`}>
            <img
              src={logoUrl}
              className={style.brandedLogo}
              alt="Logo"
              onError={addDefaultSrc}
            />
          </Link>
        ) : (
          ""
        )}
      </div>
      <Link to={`/`} className={style.link}>
        <div className={style.logoText}>
          MORE THAN A GAME. IT’S A LIFE CHANGING EXPERIENCE
        </div>
      </Link>
    </div>
  );
}
