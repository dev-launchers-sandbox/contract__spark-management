import React from "react";
import style from "./Footer.module.css";

function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.footerContent}>
        <a
          href="https://spark4community.com/terms-and-conditions/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>{" "}
        |{" "}
        <a
          href="https://spark4community.com/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>{" "}
        |{" "}
        <a
          href="https://spark4community.com/s-p-a-r-k-app-end-user-license-agreement/"
          target="_blank"
          rel="noopener noreferrer"
        >
          EULA
        </a>{" "}
        | S.P.A.R.K. 2020 ©
      </div>
    </div>
  );
}

export default Footer;
