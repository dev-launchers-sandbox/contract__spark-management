import React, { createContext, useContext, useState } from "react";

export const MessageContentContext = createContext();

export function MessageContentProvider(props) {
  const [messageContent, setMessageContent] = useState("");

  return (
    <MessageContentContext.Provider
      value={{ messageContent, setMessageContent }}
    >
      {props.children}
    </MessageContentContext.Provider>
  );
}
