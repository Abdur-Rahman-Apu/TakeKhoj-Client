import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  VStack,
  useBoolean,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { chatState } from "../ChatProvider/ChatProvider";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "./UserBadgeItem";

const GroupModal = ({ children }) => {
  const { user, setChats, chats } = chatState();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useBoolean();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = async (query) => {
    if (!query) {
      return;
    }

    setSearch(query);

    setLoading.on();

    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        config
      );

      console.log(data);
      setLoading.off();
      setSearchResult(data);
    } catch (error) {
      setLoading.off();
      toast({
        title: "Error happened",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers.length) {
      toast({
        title: "Please fill empty fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      onClose();
    } catch (error) {
      toast({
        title: "Failed to create group",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (d) => {
    setSelectedUsers(selectedUsers.filter((s) => s._id !== d._id));
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setGroupChatName();
          setSelectedUsers([]);
          setSearchResult([]);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"2xl"}>Create a group</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Group name"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>Friends</FormLabel>
              <Input
                type="text"
                placeholder="Users eg. A , B , C"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            <HStack>
              {selectedUsers?.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </HStack>

            {loading ? (
              <Spinner mt={3} />
            ) : (
              searchResult?.slice(0, 4).map((user) => (
                <VStack w={"full"} mt={3}>
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                </VStack>
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupModal;
