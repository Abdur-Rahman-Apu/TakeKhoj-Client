import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useBoolean,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { chatState } from "../ChatProvider/ChatProvider";
import UserBadgeItem from "./UserBadgeItem";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = chatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [groupChatName, setGroupChatName] = useState();
  const [loadingRename, setLoadingRename] = useBoolean();

  const [fetchingData, setFetchingData] = useBoolean();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useBoolean();

  const handleRemove = async (wantToRemove) => {
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admin can remove users",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setFetchingData.on();
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/chat/groupRemove`,
        { chatId: selectedChat._id, userId: wantToRemove._id },
        config
      );

      wantToRemove._id === user._id ? setSelectedChat() : setSelectedChat(data);

      setFetchAgain.toggle();
      setFetchingData.off();
    } catch (error) {
      toast({
        title: "Failed to remove",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setFetchingData.off();
    }
  };

  const updateName = async () => {
    if (!groupChatName) return;

    setLoadingRename.on();
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain.toggle();
      setLoadingRename.off();
    } catch (error) {
      setLoadingRename.off();
      toast({
        title: "Failed to update",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setGroupChatName("");
  };

  const handleSearch = async (search) => {
    if (!search) {
      toast({
        title: "Please fill the empty field",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      setLoading.on();

      console.log(loading, "loading");

      const config = {
        headers: { authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        config
      );

      console.log(data, "search");

      setLoading.off();
      setSearchResult(data);
    } catch (error) {
      setLoading.off();
      toast({
        title: "Error happened",
        description: "Failed to get search result",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddUser = async (wantToAdd) => {
    console.log(selectedChat, "selected chat");
    console.log(selectedChat.users.find((u) => u._id === wantToAdd));
    console.log(wantToAdd);
    if (selectedChat.users.find((u) => u._id === wantToAdd)) {
      toast({
        title: "User already exist",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admin can add users",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setFetchingData.on();
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/chat/groupAdd`,
        { chatId: selectedChat._id, userId: wantToAdd },
        config
      );

      setSelectedChat(data);
      setFetchAgain.toggle();
      setFetchingData.off();
    } catch (error) {
      setFetchingData.off();
      toast({
        title: "Failed to update",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <IconButton
        icon={<ViewIcon />}
        size={"md"}
        bg={"gray.100"}
        color={"black"}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            justifyContent={"center"}
            textTransform={"uppercase"}
            fontSize={"2xl"}
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              justifyContent={"space-between"}
              gap={2}
            >
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>

            <HStack my={4}>
              <FormControl>
                <Input
                  variant={"filled"}
                  placeholder="Update group name..."
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </FormControl>
              <Button
                isLoading={loadingRename}
                bg={"green.400"}
                onClick={updateName}
              >
                Update
              </Button>
            </HStack>
            <VStack my={4}>
              <FormControl>
                <Input
                  variant={"filled"}
                  placeholder="Add user to group..."
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user._id)}
                  />
                ))
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleRemove(user)}>
              Leave group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
