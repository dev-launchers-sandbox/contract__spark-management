import React, { createContext, useContext, useState, useEffect } from "react";

export const MessagesContext = createContext([]);

export function MessagesProvider(props) {
  const [messages, setMessages] = useState([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {props.children}
    </MessagesContext.Provider>
  );
}
