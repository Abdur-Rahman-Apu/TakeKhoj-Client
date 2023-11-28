import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useBoolean();
  const [loading, setLoading] = useBoolean();

  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading.on();
    if (!email || !password) {
      toast({
        title: "Please fill all empty fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading.off();
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      toast({
        title: "Logged In successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading.off();
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Failed to login",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading.off();
      console.log(error);
    }
  };

  return (
    <VStack spacing={6}>
      {/* Email field  */}
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      {/* Password  */}
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem" onClick={setShow.toggle}>
            {/* <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button> */}
            {show ? <ViewOffIcon /> : <ViewIcon />}
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Login button  */}
      <Button w={"full"} isLoading={loading} onClick={submitHandler}>
        Login
      </Button>
      <Button
        w={"full"}
        colorScheme="red"
        onClick={() => {
          setEmail("guest@gmail.com");
          setPassword("123456");
        }}
      >
        Guest
      </Button>
      <HStack>
        <Text>Create a new account?</Text>
        <Box as="span" color={"blue"}>
          {" "}
          <Link to={"/signUp"} color="blue">
            Sign up
          </Link>
        </Box>
      </HStack>
    </VStack>
  );
};

export default Login;
