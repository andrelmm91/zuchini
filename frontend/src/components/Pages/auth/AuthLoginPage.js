import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GiOwl } from "react-icons/gi";
import { BiShow, BiHide } from "react-icons/bi";

import { Form, Link as RouteLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cleanToken, tokenVerify } from "../../store/auth-actions";

export default function AuthLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    dispatch(cleanToken());
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:8082/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      const token = data.token;

      // save token
      localStorage.setItem("token", token);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem("expiration", expiration.toISOString());

      navigate("/");
    } catch (error) {
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
                </InputGroup>
              </FormControl>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                {/* <Checkbox>Remember me</Checkbox> */}
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
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
                  Login
                </Button>
                {!isValid && (
                  <Text textAlign={"center"} color={"red"} size={"xs"}>
                    login invalid
                  </Text>
                )}
                <Stack pt={0}>
                  <Text align={"center"}>
                    Don't have an account?{" "}
                    <Link as={RouteLink} color={"blue.400"} to="../signup">
                      Sign up
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
