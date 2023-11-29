import React, { useEffect } from "react";
import axios from "axios";
import { chatState } from "../ChatProvider/ChatProvider";
import { Box } from "@chakra-ui/react";

const ChatPage = () => {
  const { user } = chatState();

  return (
    <Box w={"full"}>
      {/* {user && <SideDrawer/>} */}
      <Box>
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </Box>
  );
};

export default ChatPage;
