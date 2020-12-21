import React, { useContext } from "react";
import { MessagesContext } from "../../../useContext/MessagesProvider";
import socket from "../../../utils/socket.js";

function ReactionsManager(props) {
  const { messages, setMessages } = useContext(MessagesContext); //ANNOYING FORMATTER

  const isEmojiThere = (msgId, emoji) => {
    if (!msgId || !emoji) return;
    const message = messages.find((msg) => msg.id === msgId);
    if (!message) return;
    for (let i = 0; i < message.reactions.length; i++) {
      let reaction = message.reactions[i];

      if (reaction.emoji === emoji) {
        return true;
      }
    }
    return false;
  };

  const addReaction = (message, reaction) => {
    setMessages((msgs) => {
      const newMsgs = msgs.concat();
      const msg = messages.find((m) => m.id === message.id);

      if (!msg) return;

      const index = newMsgs.indexOf(msg);
      const newMessage = {
        ...msg,
        reactions: [...msg.reactions, reaction],
      };

      newMsgs.splice(index, 1, newMessage);
      return newMsgs;
    });
  };

  const updateCount = (message, reaction, num, isChecked) => {
    const clientMessageObject = messages.find((msg) => msg.id === message.id);
    if (!clientMessageObject) return;
    const reactionInArray = clientMessageObject.reactions.find(
      (r) => r.emoji === reaction.emoji
    );
    if (!reactionInArray) return;
    const reactionIndex = clientMessageObject.reactions.indexOf(
      reactionInArray
    );

    setMessages((msgs) => {
      const messagesClone = messages.concat();
      const msgClone = { ...clientMessageObject };
      const prevCount = msgClone.reactions[reactionIndex].count;

      if (prevCount === 1 && num === -1) {
        msgClone.reactions.splice(reactionIndex, 1);
      } else {
        msgClone.reactions[reactionIndex].isChecked = isChecked;
        msgClone.reactions[reactionIndex].count = prevCount + num;
      }
      const index = messages.indexOf(clientMessageObject);
      messagesClone.splice(index, 1, msgClone);

      return messagesClone;
    });
  };

  socket.off("receiveReaction");

  socket.on("receiveReaction", (message, reaction) => {
    const msg = messages.find((m) => m.id === message.id);
    if (!msg) return;
    if (isEmojiThere(msg.id, reaction.emoji)) {
      const messageReaction = msg.reactions.find(
        (r) => r.emoji === reaction.emoji
      );
      if (!messageReaction) return;
      updateCount(msg, reaction, 1, messageReaction.isChecked);
    } else {
      addReaction(msg, reaction);
    }
  });

  socket.off("receiveRemoveReaction");

  socket.on("receiveRemoveReaction", (message, reaction) => {
    const clientMessageObject = messages.find((msg) => msg.id === message.id);
    if (!clientMessageObject) return;
    const reactions = clientMessageObject.reactions;
    const msgReaction = reactions.find((r) => r.emoji === reaction.emoji);
    if (!msgReaction) return;
    updateCount(message, reaction, -1, msgReaction.isChecked);
  });

  return <div></div>;
}

export default ReactionsManager;
