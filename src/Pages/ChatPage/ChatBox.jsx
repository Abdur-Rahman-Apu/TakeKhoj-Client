import React from "react";
import { chatState } from "../ChatProvider/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = chatState();
  return (
    <Box
      w={{ base: "100%", md: "68%" }}
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      flexDir={"column"}
      bg={"gray.200"}
      borderRadius={"lg"}
      border={"1px solid"}
      borderColor={"secondary"}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
