import React, { useState, useEffect } from "react";
import style from "./Logo.module.css";

import RedLogo from "./../../../images/spark_app_logo_transparent.png";
//import BrandedLogo from "../../../images/branded-logo.png";
import { Link } from "react-router-dom";
import BrandedLogo from "../../../images/mcneil-logo.png";
export default function Logo(props) {
  const [doesImageExist, setDoesImageExist] = useState(true);

  const addDefaultSrc = event => {
    event.target.src = null;
    setDoesImageExist(false);
  };
  // Logo Component and text underneath it.
  return (
    <div className={style.logo} style={{ marginTop: props.marginTop }}>
      <div className={style.brandedLogoContainer}>
        <Link to={`/`}>
          <img src={RedLogo} className={style.sparkLogo} alt="Logo" />
        </Link>
        {doesImageExist ? (
          <p className={style.brandedLogoText}>IN PARTNERSHIP WITH</p>
        ) : (
          ""
        )}
        {doesImageExist ? (
          <Link to={`/`}>
            <img
              src={"/images/branded-logo.png"}
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
