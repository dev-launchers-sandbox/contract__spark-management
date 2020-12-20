import React from "react";
import style from "./Toggle.module.css";

function Toggle(props){

  const handleOpen = () => {
    props.handleCallBack(true);
  }

  return(
    <div className={style.buttonHolder}>
      <button className={style.button} onClick={handleOpen}>Open Chat 💬</button>
    </div>
  )
}

export default Toggle;
