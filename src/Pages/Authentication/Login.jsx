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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useBoolean();

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
      <Button w={"full"}>Login</Button>
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
