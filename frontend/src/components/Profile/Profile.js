import Frame from "../cards/Frame";

import {
  Container,
  Flex,
  Box,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  InputRightElement,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const email = useSelector((state) => state.authToken.email);
  const navigate = useNavigate();
  const username = getUserName(email);

  return (
    <Container maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box p={4}>
          <Box p={5} bg="white" borderRadius="lg">
            <VStack spacing={5}>
              <FormControl id="name" isReadOnly={isEmailChanged ? false : true}>
                <FormLabel>Your Name</FormLabel>
                <InputGroup borderColor="none">
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
                      <Text color={isNameChanged ? "#0D74FF" : "gray.900"}>
                        Edit
                      </Text>
                    </IconButton>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl
                id="email"
                isReadOnly={isEmailChanged ? false : true}
              >
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdOutlineEmail color="gray.800" />}
                  />
                  <Input type="text" size="md" defaultValue={email} />
                  <InputRightElement>
                    <IconButton
                      variant={"ghost"}
                      onClick={() =>
                        setIsEmailChanged((isEmailChanged) => !isEmailChanged)
                      }
                    >
                      <Text color={isEmailChanged ? "#0D74FF" : "gray.900"}>
                        Edit
                      </Text>
                    </IconButton>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Box alignContent={"right"}>
                <Link as={RouteLink} color={"blue.400"} to="">
                  Change password
                </Link>
              </Box>
              <FormControl>
                <HStack>
                  <Button
                    variant="solid"
                    bg={
                      isEmailChanged || isNameChanged ? "#0D74FF" : "gray.300"
                    }
                    color={
                      isEmailChanged || isNameChanged ? "white" : "gray.900"
                    }
                    disabled={isEmailChanged || isNameChanged}
                  >
                    Apply changes
                  </Button>
                  <Button variant="solid" onClick={() => navigate("..")}>
                    Cancel
                  </Button>
                </HStack>
              </FormControl>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}

async function getUserName(email) {}
