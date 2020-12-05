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
  const mediaQuery = window.matchMedia("(orientation: portrait)");

  const handleClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  socket.off("receiveReaction");
  socket.off("receiveRemoveReaction");

  socket.on("receiveReaction", (message, reaction) => {
    if (isEmojiThere(message.id, reaction.emoji)) {
      const clientMessageObject = messages.find((msg) => msg.id === message.id);
      if (!clientMessageObject) return;

      const messageReaction = clientMessageObject.reactions.find(
        (r) => r.emoji === reaction.emoji
      );
      if (!messageReaction) return;
      updateCount(message, reaction, 1, messageReaction.isChecked);
    } else {
      addReaction(message, reaction);
    }
  });

  socket.on("receiveRemoveReaction", (message, reaction) => {
    const clientMessageObject = messages.find((msg) => msg.id === message.id);
    const reactions = clientMessageObject.reactions;
    const msgReaction = reactions.find((r) => r.emoji === reaction.emoji);

    updateCount(message, reaction, -1, msgReaction.isChecked);
  });

  const handleEmojiSelection = (emoji) => {
    props.setShowButton(false);
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

    socket.emit("addReaction", props.message, serverReaction);

    if (!isEmojiThere(props.message.id, emoji.native)) {
      addReaction(props.message, reaction);
    } else {
      const reactionToUpdate = props.message.reactions.find(
        (r) => r.emoji === emoji.native
      );

      if (reaction.isChecked) return;

      updateCount(props.message, reaction, 1, true);
    }
  };

  const isEmojiThere = (msgId, emoji) => {
    const message = messages.find((msg) => msg.id === msgId);
    if (!message) return;
    for (let i = 0; i < message.reactions.length; i++) {
      let reaction = message.reactions[i];
      console.log(`through loop #${i + 1}`, reaction.emoji);
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
    const userMessage = messages.find((msg) => msg.id === message.id);
    if (!userMessage) return;
    const reactionInArray = userMessage.reactions.find(
      (r) => r.emoji === reaction.emoji
    );
    if (!reactionInArray) return;
    const reactionIndex = userMessage.reactions.indexOf(reactionInArray);

    setMessages((msgs) => {
      const messagesClone = messages.concat();
      const msgClone = { ...userMessage };
      const prevCount = msgClone.reactions[reactionIndex].count;

      if (prevCount === 1 && num === -1) {
        msgClone.reactions.splice(reactionIndex, 1);
      } else {
        msgClone.reactions[reactionIndex].isChecked = isChecked;
        msgClone.reactions[reactionIndex].count = prevCount + num;
      }
      const index = messages.indexOf(userMessage);
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
        <div
          style={{
            top: !props.openDownwards && 0,
            bottom: props.openDownwards && 0,
          }}
          className={style.pickerContainer}
        >
          <Picker
            title="Pick you emoji"
            onSelect={handleEmojiSelection}
            theme="dark"
            set="google"
            perLine={8}
            style={{ width: mediaQuery.matches ? "100%" : "20vw" }}
          />
        </div>
      )}
    </div>
  );
}

export default EmojiButton;
