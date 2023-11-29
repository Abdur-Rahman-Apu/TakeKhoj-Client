import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import RightSideImg from "../../assets/message.png";
import logo from "../../assets/logo.jpg";

const Home = () => {
  const path = useLocation().pathname;

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      navigate("/chatPage");
    }
  }, []);
  return (
    <Flex
      bg={"primary"}
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
        <VStack>
          <Box w={"70px"} mt={7}>
            <Image src={logo} alt="logo of the website" objectFit={"cover"} />
          </Box>
          <Heading fontFamily={"revert-layer"} fontSize={34} mt={4} mb={8}>
            {path.includes("/signUp")
              ? "Create a new account"
              : "Welcome Back!"}
          </Heading>
        </VStack>
        <Flex h={"100%"} align={"center"}>
          <Box flexBasis={"60%"} py={6}>
            <VStack>
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
