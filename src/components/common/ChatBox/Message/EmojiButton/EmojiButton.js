import React, { useEffect, useState, useContext } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { MessagesContext } from "../../../../../useContext/MessagesProvider";
import style from "./EmojiButton.module.css";
import socket from "../../../../../utils/socket.js";

function EmojiButton(props) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [hasEmojiBeenClicked, setHasEmojiBeenClicked] = useState(false);
  const { messages, setMessages } = useContext(MessagesContext);


  const handleClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  socket.off("receivedReaction");
  socket.on("receivedReaction", (data) => {
    //console.log("Backend data: ", data);

    setMessages((msgs) => {
      const newMsgs = msgs.concat();
      const getMessageObject = newMsgs.find(message => message.id === data.id);
      const index = newMsgs.indexOf(getMessageObject);
      const newMsgObj  = {
        ...getMessageObject,
        reactions: [...data.reactions]
      }

      newMsgs.splice(index, 1, newMsgObj);
      return newMsgs;
    });
  })




  const handleEmojiSelection = (emoji) => {
    setShowEmojiPicker(false);
    const reaction = {
      emoji: emoji.native,
      count: 1,
      isChecked: false,
    };

    const newMsg = {
      ...props.message,
      reactions: [...props.message.reactions, reaction]
    };


    if (!isEmojiThere(emoji.native)) {
      addReaction(reaction);

      socket.emit("addReaction", newMsg);
    } else {
      //socket.emit("addReaction", newMsg)
      const reaction = props.message.reactions.find(
        (reaction) => reaction.emoji === emoji.native
      );
      if (reaction.isChecked) return;

      setMessages((msgs) => {
        const messagesClone = messages.concat();
        const msgClone = { ...props.message };
        const reactionIndex = props.message.reactions.indexOf(reaction);

        msgClone.reactions[reactionIndex].isChecked = true;
        msgClone.reactions[reactionIndex].count++;

        const index = messages.indexOf(props.message);
        messagesClone.splice(index, 1, msgClone);

        return messagesClone;
      });
    }
    //addReaction(reaction);
  };

  const isEmojiThere = (emoji) => {
    for (let i = 0; i < props.message.reactions.length; i++) {
      let reaction = props.message.reactions[i];
      if (reaction.emoji === emoji) {
        return true;
      }
    }
    return false;
  };

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
