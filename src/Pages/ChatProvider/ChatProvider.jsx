import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();

  const isUserExist = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  };

  return (
    <ChatContext.Provider value={{ user, setUser, isUserExist }}>
      {children}
    </ChatContext.Provider>
  );
};

export const chatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
