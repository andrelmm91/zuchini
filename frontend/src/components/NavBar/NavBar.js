import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { GiOwl } from "react-icons/gi";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Links = ["Dashboard", "Projects", "Team"];

const LinkItems = [
  { name: "Explore", href: "explore" },
  { name: "Saved", href: "/" },
  { name: "Group", href: "/" },
  { name: "Event Table", href: "/events" },
  { name: "Event Dashboard", href: "/dashboardEvents" },
];

const NavItem = ({ link }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    as={NavLink}
    to={link.href}
  >
    <p>{link.name}</p>
  </Link>
);

export default function NavBar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <AiOutlineClose /> : <FiMenu />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing="3rem" alignItems={"center"}>
            <Text fontSize="2rem">
              <GiOwl />
            </Text>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {LinkItems.map((link) => (
                <NavItem key={link.name} link={link} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList zIndex={3}>
                <NavLink to="/profile">
                  <MenuItem>Profile</MenuItem>
                </NavLink>

                <MenuDivider />
                <NavLink to="/auth/logout">
                  <MenuItem>Sign out</MenuItem>
                </NavLink>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {LinkItems.map((link) => (
                <NavItem key={link.name} link={link} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box>{children}</Box>
    </>
  );
}
