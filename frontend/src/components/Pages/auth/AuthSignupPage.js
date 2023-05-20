import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { GiOwl } from "react-icons/gi";
import { BiShow, BiHide } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { cleanToken, userLoggedInEmail } from "../../store/auth-actions";
import { Form, Link as RouteLink, useNavigate } from "react-router-dom";

export default function AuthSignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const authData = {
      email: formData.get("email"),
      password: formData.get("password"),
      username: formData.get("username"),
      dateCreated: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };

    try {
      const response = await fetch("http://localhost:8082/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      });

      if (response.status === 422 || response.status === 401) {
        return response;
      }

      const resData = await response.json();
      const token = resData.token;

      if (!response.ok) {
        throw new Error(resData.message);
      }

      // save token
      localStorage.setItem("token", token);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem("expiration", expiration.toISOString());

      // dispatch user email
      dispatch(userLoggedInEmail(formData.get("email")));
      navigate("/");
    } catch {
      setIsValid(false);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.900", "gray.900")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>
            <Flex gap={4} color={useColorModeValue("gray.300")}>
              <GiOwl />
              Owl
            </Flex>
          </Heading>
          <Text fontSize={"lg"} color={"gray.100"}>
            Night awaits you
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("gray.400", "gray.100")}
          boxShadow={"lg"}
          p={8}
        >
          <Form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input name="username" type="text" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input name="email" type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement>
                    <IconButton
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <BiShow /> : <BiHide />}
                    </IconButton>
                  </InputRightElement>
                </InputGroup>{" "}
              </FormControl>
              <Stack spacing={4}>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  mt={3}
                >
                  Sign Up
                </Button>
                {!isValid && (
                  <Text textAlign={"center"} color={"red"} size={"xs"}>
                    Sign up invalid
                  </Text>
                )}
                <Stack pt={0}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <Link as={RouteLink} color={"blue.400"} to="../login">
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Form>
        </Box>
      </Stack>
    </Flex>
  );
}
