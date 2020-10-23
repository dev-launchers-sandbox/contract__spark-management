import React from "react";
import style from "./Toggle.module.css";

function Toggle(props){

  const handleOpen = () => {
    props.handleCallBack(true);
  }

  return(
    <span className={style.openToggle} onClick={handleOpen}>💬</span>
  )
}

export default Toggle;
