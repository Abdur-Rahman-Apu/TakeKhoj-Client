import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useBoolean,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useBoolean();
  const [showConfirmPass, setShowConfirmPass] = useBoolean();

  return (
    <VStack h={"full"} spacing={8}>
      {/* Name field  */}
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      {/* Email  */}
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="text"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* password  */}
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

      {/* confirm password  */}
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showConfirmPass ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem" onClick={setShowConfirmPass.toggle}>
            {/* <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button> */}
            {showConfirmPass ? <ViewOffIcon /> : <ViewIcon />}
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* upload picture  */}
      <FormControl isRequired>
        <FormLabel>Upload your picture</FormLabel>

        <Input
          pr="4.5rem"
          type="file"
          accept="image/*"
          placeholder="Upload pic"
        />
      </FormControl>

      {/* sign up button  */}
      <Button w={"full"}>SignUp</Button>

      <HStack>
        <Text>Already have an account? </Text>
        <Box as="span" color={"blue"}>
          {" "}
          <Link to={"/"} color="blue">
            LogIn
          </Link>
        </Box>
      </HStack>
    </VStack>
  );
};

export default Signup;
