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

  const handleEmojiSelection = (emoji) => {
    setShowEmojiPicker(false);
    const reaction = {
      emoji: emoji.native,
      count: 1,
      isChecked: true,
    };
    if(!isEmojiThere(reaction, emoji.native)){
      addReaction(reaction);
    }
    else{
      console.log("it is already there");
    }
    //addReaction(reaction);
  };


  const isEmojiThere = (reaction, emoji) => {
    for(let i=0;i<props.message.reactions.length;i++){
      let reaction = props.message.reactions[i];
      if(reaction.emoji === emoji){
        return true;
      }
    }
    return false;
  }



  const addReaction = (reaction) => {
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
            onSelect={handleEmojiSelection}
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
