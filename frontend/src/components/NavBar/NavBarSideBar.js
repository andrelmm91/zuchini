import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Badge,
  Drawer,
  Spacer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import {
  FiCompass,
  FiStar,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";

import { HiOutlineUserGroup } from "react-icons/hi";
import { GiOwl } from "react-icons/gi";
import { GrUserAdmin } from "react-icons/gr";
import { NavLink, useNavigate } from "react-router-dom";

import colorPalettes from "../colorSettings/colorPalettes";
const color = colorPalettes();

const LinkItems = [
  { name: "Explore", icon: FiCompass, href: "explore", marginTop: 0 },
  { name: "Saved", icon: FiStar, href: "", marginTop: 0 },
  { name: "Group", icon: HiOutlineUserGroup, href: "", marginTop: 0 },
  {
    name: "Event Table",
    icon: GrUserAdmin,
    href: "events",
    marginTop: "10rem",
  },
  {
    name: "Event Dashboard",
    icon: GrUserAdmin,
    href: "dashboardEvents",
    marginTop: "0",
  },
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" w="100vw" bg={color.background}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="0" m={0}>
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={color.pal2}
      borderRight="1px"
      borderRightColor={color.pal4}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        pt="5"
      >
        <Text fontSize="40" fontFamily="monospace" fontWeight="bold">
          <Flex gap={5}>
            <GiOwl />
            <Spacer>Owl</Spacer>
          </Flex>
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box mt={10}>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            href={link.href}
            icon={link.icon}
            mt={link.marginTop}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, href, children, ...rest }) => {
  return (
    <NavLink
      to={`/${href}`}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={color.pal2}
      borderBottomWidth="1px"
      borderBottomColor={color.pal4}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="40"
        fontFamily="monospace"
        fontWeight="bold"
        pt="5"
      >
        <Flex gap={5}>
          <GiOwl />
          <Spacer>Owl</Spacer>
        </Flex>
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Box position="relative" display="inline-block">
          <Menu placement="bottom-end">
            <MenuButton
              as={Button}
              variant="ghost"
              size="sm"
              p={0}
              _hover={false}
            >
              <IconButton
                as="span"
                fontSize="md"
                aria-label="Notifications"
                variant="ghost"
                icon={<FiBell />}
              />
              <Badge colorScheme="red">200</Badge>
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuItem>Notification 1</MenuItem>
              <MenuItem>Notification 2</MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://i1.rgstatic.net/ii/profile.image/377706463154176-1467063646125_Q512/Andre-Muniz-6.jpg"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Andre M.</Text>
                  <Text fontSize="xs" color="gray.600">
                    God master
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList borderColor={color.pal3} zIndex={2}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <NavLink to="/auth/logout">
                <MenuItem>Sign out</MenuItem>
              </NavLink>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
