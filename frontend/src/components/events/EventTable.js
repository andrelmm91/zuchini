import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Button,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  VStack,
} from "@chakra-ui/react";

import { IoIosArrowDropdown } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteAction } from "../async/action/deleteAction";

export default function EventTable({ events }) {
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  const handleSortClick = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedEvents = events.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  function startDeleteHandler(eventId) {
    const proceed = window.confirm("Are you sure?");
    if (!proceed) {
      return;
    }
    deleteAction(eventId);
    window.location.reload(false);
  }

  return (
    <VStack>
      <Button
        mb={"4rem"}
        size="lg"
        bg={"blue.400"}
        color={"white"}
        onClick={() => navigate("/events/new")}
        _hover={{
          bg: "blue.500",
        }}
      >
        New Event
      </Button>
      <TableContainer>
        <Table size="md">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>
                Date
                <Button size="xs" onClick={handleSortClick} bg={"transparent"}>
                  {sortOrder === "asc" ? "▲" : "▼"}
                </Button>
              </Th>
              <Th>Start time</Th>
              <Th>End time</Th>
              <Th>Price</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedEvents.map((event, index) => (
              <Tr
                key={event.id}
                _hover={{
                  bg: "blue.100",
                }}
              >
                <Td>{event.title}</Td>
                <Td>{event.date}</Td>
                <Td>{event.timeStart}</Td>
                <Td>{event.timeEnd}</Td>
                <Td>${event.price}</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<IoIosArrowDropdown />}
                      variant="outline"
                    />
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          navigate(event.id);
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          startDeleteHandler(event.id);
                        }}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
