import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  VStack,
  useBoolean,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import Logo from "../../assets/logo.jpg";
import { chatState } from "../ChatProvider/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
  const { user } = chatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useBoolean();
  const [loadingChat, setLoadingChat] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
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

  const accessChat = (userId) => {};
  return (
    <>
      <Box
        w={"full"}
        h={"9vh"}
        px={10}
        display={"flex"}
        justifyContent={"space-between"}
        bg={"secondary"}
      >
        <Image
          src={Logo}
          h={"full"}
          alt="Logo of the website"
          objectFit="cover"
        />

        <HStack align={"center"} spacing={5}>
          <Tooltip label="Search User" borderRadius={"2xl"}>
            <Search2Icon
              cursor={"pointer"}
              fontSize="lg"
              color={"white"}
              onClick={onOpen}
            />
          </Tooltip>

          <Menu>
            <MenuButton>
              <BellIcon fontSize={"2xl"} color={"white"} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton>
              <Avatar size="sm" name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>

      {/* Drawer  */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <HStack>
              <Input
                placeholder="Search user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </HStack>

            <VStack mt={10}>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
