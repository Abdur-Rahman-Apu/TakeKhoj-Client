import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useBoolean,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import Logo from "../../assets/logo.jpg";
import { chatState } from "../ChatProvider/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const { user } = chatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useBoolean();
  const [loadingChat, setLoadingChat] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = () => {};
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
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      ></Drawer>
    </>
  );
};

export default SideDrawer;
