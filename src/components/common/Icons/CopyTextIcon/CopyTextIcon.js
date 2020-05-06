import React from "react";
import style from "./CopyTextIcon.module.css";

const copyTextIcon =
  "https://storage.needpix.com/rsynced_images/clipboard-1719736_1280.png";
export default function CopyTextIcon() {
  return (
    <div className={style.copyTextIcon}>
      <img src={copyTextIcon} alt="copy text" />
    </div>
  );
}
