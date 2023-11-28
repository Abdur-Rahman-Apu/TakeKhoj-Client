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
  useToast,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useBoolean();
  const [showConfirmPass, setShowConfirmPass] = useBoolean();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "TakeKhoj");
      data.append("cloud_name", "abdur-projects");

      fetch("https://api.cloudinary.com/v1_1/abdur-projects/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          toast({
            title: "Image uploaded successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });

          console.log(data);

          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          toast({
            title: "Image upload failed",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });

          setLoading(false);
          console.log(err);
        });
    } else {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all fields",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password is not matched",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user",
        { name, email, password, pic },
        config
      );

      toast({
        title: "Registered successfully",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);

      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error happened!",
        description: error.response.data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

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
            value={password}
            placeholder="Enter password"
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

      {/* confirm password  */}
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showConfirmPass ? "text" : "password"}
            placeholder="Enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
      <FormControl>
        <FormLabel>Upload your picture</FormLabel>

        <Input
          pr="4.5rem"
          type="file"
          accept="image/*"
          placeholder="Upload pic"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      {/* sign up button  */}
      <Button w={"full"} isLoading={loading} onClick={submitHandler}>
        SignUp
      </Button>

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
