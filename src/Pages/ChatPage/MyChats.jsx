import React, { useEffect, useState } from "react";
import { chatState } from "../ChatProvider/ChatProvider";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const MyChats = () => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = chatState();
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();

  const fetchChats = async () => {
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
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);
  return <div>My chats</div>;
};

export default MyChats;
