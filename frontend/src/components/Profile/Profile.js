import Frame from "../cards/Frame";

import {
  Container,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Image,
  Link,
  InputRightElement,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { Link as RouteLink } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);

  return (
    <Container maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box p={4}>
          <Box p={5} bg="white" borderRadius="lg">
            <VStack spacing={5}>
              <FormControl id="name">
                <FormLabel>Your Name</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BsPerson color="gray.800" />}
                  />
                  <Input type="text" size="md" />
                  <InputRightElement>
                    <IconButton
                      variant={"ghost"}
                      onClick={() =>
                        setIsNameChanged((isNameChanged) => !isNameChanged)
                      }
                    >
                      <Text
                        color={
                          isEmailChanged || isNameChanged
                            ? "#0D74FF"
                            : "gray.900"
                        }
                      >
                        Edit
                      </Text>
                    </IconButton>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="name">
                <FormLabel>Mail</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdOutlineEmail color="gray.800" />}
                  />
                  <Input type="text" size="md" />
                  <InputRightElement>
                    <IconButton
                      variant={"ghost"}
                      onClick={() =>
                        setIsEmailChanged((isEmailChanged) => !isEmailChanged)
                      }
                    >
                      <Text>Edit</Text>
                    </IconButton>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Box alignContent={"right"}>
                <Link as={RouteLink} color={"blue.400"} to="">
                  Change password
                </Link>
              </Box>
              <FormControl id="name" float="right">
                <Button
                  variant="solid"
                  bg={isEmailChanged || isNameChanged ? "#0D74FF" : "gray.300"}
                  color={isEmailChanged || isNameChanged ? "white" : "gray.900"}
                  disabled={isEmailChanged || isNameChanged}
                >
                  Apply changes
                </Button>
              </FormControl>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
