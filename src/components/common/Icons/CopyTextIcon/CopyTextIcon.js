import React from "react";
import style from "./CopyTextIcon.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import { CopyToClipboard } from "react-copy-to-clipboard";

import clipboardIcon from "./../../../../images/clipboard-icon.png";
// this is the notifications that will appear when the text is coppied to the clipboard.
// This is using the React toastify package.
const notify = () => {
  toast("Text Copied to Clipboard!", {
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

toast.configure();
export default function CopyTextIcon(props) {
  return (
    <div className={style.copyTextIcon}>
      <CopyToClipboard text={props.text}>
        <img
          className={style.CopyToClipboardIcon}
          src={clipboardIcon}
          alt="copy text"
          onClick={notify}
        />
      </CopyToClipboard>
    </div>
  );
}
