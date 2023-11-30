import { CloseButton, HStack, Text } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <HStack
      bg={"secondary"}
      fontWeight={"bold"}
      color={"white"}
      borderRadius={"lg"}
      p={1}
      my={2}
    >
      <Text ml={2}>{user.name}</Text>
      <CloseButton onClick={handleFunction} />
    </HStack>
  );
};

export default UserBadgeItem;
