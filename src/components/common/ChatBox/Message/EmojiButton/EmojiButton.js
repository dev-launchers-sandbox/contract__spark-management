import React, { useEffect, useState } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

import style from "./EmojiButton.module.css";

function EmojiButton(props) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [hasEmojiBeenClicked, setHasEmojiBeenClicked] = useState(false);

  const handleClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    const message = props.getMessageObject();
    const reaction = {
      emoji: emoji.native,
      count: 1,
      isChecked: !hasEmojiBeenClicked,
    };
    message.reactions.push(reaction);
  };

  return (
    <div className={style.emojiButtonContainer}>
      <button className={style.emojiButton} onClick={handleClick}>
        😀<b>+</b>
      </button>
      {showEmojiPicker && (
        <div className={style.pickerContainer}>
          <Picker
            title="Pick you emoji"
            onSelect={handleEmojiClick}
            theme="dark"
            set="google"
            perLine={8}
            style={{ position: "relative", maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
}

export default EmojiButton;
