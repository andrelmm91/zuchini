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
import { useState } from "react";
import { GiOwl } from "react-icons/gi";
import { BiShow, BiHide } from "react-icons/bi";

import { Form, Link as RouteLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cleanToken } from "../../store/auth-actions";

export default function AuthLoginPage() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  dispatch(cleanToken());

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
          <Form method="POST">
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
