import React, { useEffect, useState, useContext } from "react";
import style from "./EmojiButton.module.css";

import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

import { MessagesContext } from "../../../../../useContext/MessagesProvider";

import socket from "../../../../../utils/socket.js";
import getRoomCode from "../../../../../utils/getRoomCode";

function EmojiButton(props) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [hasEmojiBeenClicked, setHasEmojiBeenClicked] = useState(false);
  const { messages, setMessages } = useContext(MessagesContext);

  const handleClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  socket.off("receivedReaction");

  socket.on("receivedReaction", (data) => {
    if (isEmojiThere(data.emoji)) {
      updateCount(data.message, data, 1, false);
    } else {
      addReaction(data.message, data);
    }
  });

  const handleEmojiSelection = (emoji) => {
    setShowEmojiPicker(false);

    const reaction = {
      message: props.message,
      emoji: emoji.native,
      count: 1,
      isChecked: true,
      room: getRoomCode(),
    };

    const serverReaction = { ...reaction };
    serverReaction.isChecked = false;

    socket.emit("addReaction", serverReaction);

    if (!isEmojiThere(emoji.native)) {
      addReaction(props.message, reaction);
    } else {
      const reactionToUpdate = props.message.reactions.find(
        (r) => r.emoji === emoji.native
      );

      if (reaction.isChecked) return;

      updateCount(props.message, reaction, 1, true);
    }
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

  const addReaction = (message, reaction) => {
    setMessages((msgs) => {
      const newMsgs = msgs.concat();
      const index = newMsgs.indexOf(message);
      const newMessage = {
        ...message,
        reactions: [...message.reactions, reaction],
      };

      newMsgs.splice(index, 1, newMessage);
      return newMsgs;
    });
  };

  const updateCount = (message, reaction, num, isChecked) => {
    setMessages((msgs) => {
      const messagesClone = messages.concat();
      const msgClone = { ...message };
      const reactionIndex = message.reactions.indexOf(reaction);
      const prevCount = msgClone.reactions[reactionIndex].count;

      msgClone.reactions[reactionIndex].isChecked = isChecked;
      msgClone.reactions[reactionIndex].count = prevCount + num;

      const index = messages.indexOf(message);
      messagesClone.splice(index, 1, msgClone);

      return messagesClone;
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
