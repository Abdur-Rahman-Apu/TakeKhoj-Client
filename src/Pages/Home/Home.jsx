import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import RightSideImg from "../../assets/message.png";
import logo from "../../assets/logo.jpg";

const Home = () => {
  const path = useLocation().pathname;
  return (
    <Flex
      bg={"#a9b1ec"}
      w={"100%"}
      minH={"100vh"}
      justify={"center"}
      alignItems={"center"}
    >
      <Box
        w={"60vw"}
        minH="80vh"
        bg={"#fff"}
        p="1"
        shadow={"md"}
        borderRadius={"lg"}
        my={10}
      >
        <Flex h={"100%"}>
          <Box flexBasis={"60%"} py={6}>
            <VStack>
              <Box w={"70px"}>
                <Image
                  src={logo}
                  alt="logo of the website"
                  objectFit={"cover"}
                />
              </Box>
              <Heading fontFamily={"revert-layer"} fontSize={34} mt={4} mb={8}>
                {path.includes("/signUp")
                  ? "Create a new account"
                  : "Welcome Back!"}
              </Heading>
              <Outlet />
            </VStack>
          </Box>
          <Box
            flexBasis={"40%"}
            // bg="#cacce0"
            h={"100%"}
            display={"flex"}
            alignItems={"center"}
          >
            <Image
              objectFit="cover"
              src={RightSideImg}
              alt="An image of messaging by a man"
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;
