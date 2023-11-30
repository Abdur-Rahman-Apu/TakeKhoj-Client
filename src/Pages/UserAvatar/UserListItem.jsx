import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user }) => {
  return (
    <HStack
      bg={"gray.100"}
      p={3}
      borderRadius={"xl"}
      cursor={"pointer"}
      _hover={{ bg: "secondary", color: "white" }}
      overflow={"hidden"}
    >
      <Image src={user.pic} alt={user.name} borderRadius={"full"} h={"50px"} />
      <VStack align={"flex-start"}>
        <Text fontSize={"base"} fontWeight={"bold"}>
          {user.name}
        </Text>
        <Text>Email:{user.email}</Text>
      </VStack>
    </HStack>
  );
};

export default UserListItem;
