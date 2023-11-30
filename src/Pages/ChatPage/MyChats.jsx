import React, { useEffect, useState } from "react";
import { chatState } from "../ChatProvider/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import ChatLoading from "../Miscellaneous/ChatLoading";
import { getSender } from "../Config/ChatLogics";
import GroupModal from "../Miscellaneous/GroupModal";

const MyChats = () => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = chatState();
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();

  const fetchChats = async () => {
    console.log("fetch chats");
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/chat`,
        config
      );

      console.log(data, "Chat");

      setChats(data);
    } catch (error) {
      toast({
        title: "Error happened",
        description: "Failed to fetch chats",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    console.log("object");
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);
  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      w={{ base: "100%", md: "31%" }}
      bg={"primary"}
      borderRadius={"2xl"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"full"}
        p={3}
      >
        <Text
          fontSize={"2xl"}
          fontFamily={"work-sans"}
          fontWeight={"bold"}
          color={"black"}
        >
          My Chats
        </Text>
        <GroupModal>
          <Button
            rightIcon={<AddIcon />}
            bg={"white"}
            color={"black"}
            _hover={{ color: "white", bg: "secondary" }}
          >
            New Group Chat
          </Button>
        </GroupModal>
      </Box>

      <Box>
        {chats ? (
          <Stack spacing={3} mt={4}>
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                cursor={"pointer"}
                bg={selectedChat === chat ? "secondary" : "white"}
                color={selectedChat === chat ? "white" : "black"}
                mx={3}
                p={3}
                borderRadius={"lg"}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
