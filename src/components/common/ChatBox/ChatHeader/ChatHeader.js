import React, { useState, useEffect} from "react";
import style from "./ChatHeader.module.css";
import axios from "axios";

function ChatHeader(props) {
  const [subClient, setSubClient] = useState("");


  useEffect(() => {
    const getSubClient = async () => {
      try{
        const res = await axios.get(`https://api.spark4community.com/codes/${props.room()}`);
        console.log(res)
        const subClient = res.data.code.sub_client_name === "" ? res.data.code.client_name : res.data.code.sub_client_name;
        setSubClient(subClient);
      }
      catch(e){
        console.error("There is an error: ", e);
      }
    }
    getSubClient();
  }, [])


  return (
    <div className={style.chatHeader}>
      <p className={style.room}> {subClient} </p>
      <span className={style.closeToggle} onClick={props.handleClose}>
        ✖️
      </span>
    </div>
  );
}

export default ChatHeader;
