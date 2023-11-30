import { Skeleton, Stack, VStack } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
  return (
    <VStack w={"full"} spacing={10} mt={10}>
      <Skeleton height="80px" w={"full"} />
      <Skeleton height="80px" w={"full"} />
      <Skeleton height="80px" w={"full"} />
    </VStack>
  );
};

export default ChatLoading;
