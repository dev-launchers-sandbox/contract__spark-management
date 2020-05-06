import React from "react";
import style from "./YellowCard.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";

toast.configure();
export default function YellowCard(props) {
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
  const copyImage =
    "https://storage.needpix.com/rsynced_images/clipboard-1719736_1280.png";
  const selectImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Bright_green_checkbox-checked.svg/1024px-Bright_green_checkbox-checked.svg.png";

  return (
    <div className={style.OrangeCards}>
      <div>
        <h1>{props.answer}</h1>
      </div>
      <CopyToClipboard text={props.answer}>
        <img
          onClick={notify}
          className={style.CopyToClipboardImage}
          src={copyImage}
          alt="copy"
        />
      </CopyToClipboard>
      <img
        onClick={props.onClick}
        className={style.selectCardImage}
        src={selectImage}
        alt="SelectCard"
      />
    </div>
  );
}
