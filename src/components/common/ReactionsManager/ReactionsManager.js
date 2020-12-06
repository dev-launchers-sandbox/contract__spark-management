import React, {useContext} from "react";
import { MessagesContext } from "../../../useContext/MessagesProvider";
import socket from "../../../utils/socket.js";

function ReactionsManager(props){

  const { messages, setMessages } = useContext(MessagesContext); //ANNOYING FORMATTER

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
      const msg = messages.find((m) => m.id === message.id);
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

  socket.off("receiveReaction");

  socket.on("receiveReaction", (message, reaction) => {
    const msg = messages.find((m) => m.id === message.id);
    console.log("msg: ", msg);
    if (isEmojiThere(msg.id, reaction.emoji)) {
      if (!msg) return;

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
    const reactions = clientMessageObject.reactions;
    const msgReaction = reactions.find((r) => r.emoji === reaction.emoji);

    updateCount(message, reaction, -1, msgReaction.isChecked);
  });



  return (
    <div></div>
  )
}

export default ReactionsManager;
