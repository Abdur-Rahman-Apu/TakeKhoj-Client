import React from "react";
import { chatState } from "../ChatProvider/ChatProvider";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../Config/ChatLogics";
import ProfileModal from "../Miscellaneous/ProfileModal";
import UpdateGroupChatModal from "../Miscellaneous/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = chatState();
  return (
    <>
      {selectedChat ? (
        <>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            bg={"primary"}
            m={2}
            p={2}
            height={"8vh"}
            borderRadius={"lg"}
          >
            <IconButton
              display={{ md: "none" }}
              icon={<ArrowBackIcon />}
              size={"md"}
              bg={"gray.100"}
              color={"black"}
              onClick={() => setSelectedChat("")}
            />

            <Text fontSize={"lg"} fontWeight={"bold"} color={"white"}>
              {!selectedChat.isGroupChat ? (
                <>{getSender(user, selectedChat.users)}</>
              ) : (
                selectedChat.chatName.toUpperCase()
              )}
            </Text>

            <ProfileModal user={getSenderFull(user, selectedChat.users)}>
              <IconButton
                display={selectedChat.isGroupChat && "none"}
                icon={<ViewIcon />}
                size={"md"}
                bg={"gray.100"}
                color={"black"}
              />
            </ProfileModal>

            {selectedChat.isGroupChat && (
              <UpdateGroupChatModal
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
            )}
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          h={"full"}
          w={"full"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text fontSize={"2xl"} fontFamily={"work-sans"}>
            Start chat with friends
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
