import React, { useEffect, useState, useContext } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { MessagesContext } from "../../../../../useContext/MessagesProvider";
import style from "./EmojiButton.module.css";

function EmojiButton(props) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [hasEmojiBeenClicked, setHasEmojiBeenClicked] = useState(false);
  const { messages, setMessages } = useContext(MessagesContext);

  const handleClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const addReaction = (emoji) => {
    setShowEmojiPicker(false);
    const reaction = {
      emoji: emoji.native,
      count: 1,
      isChecked: true,
    };

    setMessages((msgs) => {
      const newMsgs = msgs.concat();
      const index = newMsgs.indexOf(props.message);
      const newMessage = {
        ...props.message,
        reactions: [...props.message.reactions, reaction],
      };

      newMsgs.splice(index, 1, newMessage);
      return newMsgs;
    });
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
            onSelect={addReaction}
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
