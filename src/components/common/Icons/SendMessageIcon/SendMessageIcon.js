import React, {useContext} from "react";
import sendMessageIcon from "./../../../../images/send-message-icon.png";
import style from "./SendMessageIcon.module.css";
import { MessageContentContext } from "../../../../useContext/MessageContentProvider.js";



function SendMessageIcon(props){

  const { messageContent, setMessageContent } = useContext(
    MessageContentContext
  );

  const isThereText = () => {
    if(messageContent !== "") return true;
  }

  return(
    <img
      src={sendMessageIcon}  
      style={{opacity: isThereText() ? 100 : 0.25}}
      className={style.sendMessageIcon}
      onClick={props.handleSubmit}
      title="send message"
    />
  )
}

export default SendMessageIcon;
