import React, { useEffect } from "react";
import axios from "axios";
import { chatState } from "../ChatProvider/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../Miscellaneous/SideDrawer";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const { user, isUserExist } = chatState();

  const navigate = useNavigate();
  useEffect(() => {
    isUserExist();
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <Box w={"full"}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent={"space-between"}
        w={"full"}
        p={"10px"}
        h={"90vh"}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </Box>
  );
};

export default ChatPage;
