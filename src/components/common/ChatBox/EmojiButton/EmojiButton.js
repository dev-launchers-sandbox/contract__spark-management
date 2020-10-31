import React, {useEffect, useState} from "react";
import { Picker } from 'emoji-mart'
import "emoji-mart/css/emoji-mart.css";

import style from "./EmojiButton.module.css";

function EmojiButton(){

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);

  const handleClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleEmojiClick = (emoji) => {
    setCurrentEmoji(emoji.native);
    console.log(emoji.native);
  }

  return(
    <div className={style.emojiButtonContainer}>
      <button className={style.emojiButton} onClick={handleClick}>😀+</button>
      {showEmojiPicker && <Picker title="pick your emoji" onSelect={handleEmojiClick} theme="dark"/>}
    </div>
  )
}


export default EmojiButton;
