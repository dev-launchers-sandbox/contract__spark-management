import React, {useEffect, useState} from "react";
import { Picker } from 'emoji-mart'
import "emoji-mart/css/emoji-mart.css";

import style from "./EmojiButton.module.css";

function EmojiButton(props){

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [hasEmojiBeenClicked, setHasEmojiBeenClicked] = useState(false);

  const handleClick = () => {
    setShowEmojiPicker(!showEmojiPicker);

  }

  const handleEmojiClick = (emoji) => {
    const message = props.getMessageObject();
    const reaction = {
      emoji: emoji.native,
      count: 1,
      clicked: !hasEmojiBeenClicked
    }
    message.reactions.push(reaction);
    console.log("this is the new message with emoji: ", message);
  }

  return(
    <div className={style.emojiButtonContainer}>
      <button className={style.emojiButton} onClick={handleClick}>😀<b>+</b></button>
      {showEmojiPicker && <Picker title="pick your emoji" onSelect={handleEmojiClick} theme="dark" set="google"/>}
    </div>
  )
}


export default EmojiButton;
