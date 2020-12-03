import React, { useContext } from "react";
import style from "./SendToChatIcon.module.css";
import sendToChatIcon from "./../../../../images/send-to-chat-icon.png";
import { MessageContentContext } from "../../../../useContext/MessageContentProvider";

export default function SendToChatIcon(props) {
  const { messageContent, setMessageContent } = useContext(
    MessageContentContext
  ); //ANNOYING FORMATTER

  const sendToChat = () => {
    props.openChat(true);

    const isSpaceNeed = spaceNeeded();
    const newContent =
      messageContent +
      (isSpaceNeed ? " " : "") +
      (props.isYellowCard
        ? `\uFEFF${props.text.toUpperCase()}`
        : `\u200B${props.text.toUpperCase()}`);
    setMessageContent(newContent);
  };

  const spaceNeeded = () => {
    if (!messageContent.length) return false;
    else if (messageContent.charAt(messageContent.length - 1) === " ") {
      return false;
    }
    return true;
  };

  return (
    <div>
      <img
        className={style.SendToChatIcon}
        src={sendToChatIcon}
        alt="copy text"
        onClick={sendToChat}
        title="Send To Chat"
      />
    </div>
  );
}
