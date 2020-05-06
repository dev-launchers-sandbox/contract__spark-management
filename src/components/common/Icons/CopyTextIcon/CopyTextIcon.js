import React from "react";
import style from "./CopyTextIcon.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import { CopyToClipboard } from "react-copy-to-clipboard";

const copyTextIcon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Toicon-icon-stone-copy.svg/1024px-Toicon-icon-stone-copy.svg.png";

const notify = () => {
  toast("Text Copied to Clipboard!", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2500,
    className: css({
      background: "transparent"
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
          src={copyTextIcon}
          alt="copy text"
          onClick={notify}
        />
      </CopyToClipboard>
    </div>
  );
}
