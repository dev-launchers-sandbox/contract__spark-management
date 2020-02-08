import React from "react";
import ReactDOM from "react-dom";

import style from "./Header.module.css";

export default class Header extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <div className={style.header}>Your App</div>
      </div>
    );
  }
}
