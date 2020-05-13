import React from "react";
import ReactDOM from "react-dom";

import style from "./PageBody.module.css";

export default class PageBody extends React.Component {
  //this returns a div with all of the content that it is holding.
  // The content is passed down using children props.
  render() {
    return (
      <div>
        <div className={style.pageBody}>{this.props.children}</div>
      </div>
    );
  }
}
