import { Flex, SimpleGrid, Text, Button, VStack } from "@chakra-ui/react";

import { Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";

import Card from "../cards/Card";
import EventFrame from "./EventFrame";

export default function DashboardEvents() {
  const { events } = useLoaderData();

  const renderTable = (loadedEvents) => {
    const sortedEvents = loadedEvents.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });

    return (
      <VStack>
        <Button
          mb={"4rem"}
          size="lg"
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          New Event
        </Button>
        <SimpleGrid columns={3}>
          {sortedEvents.map((event) => (
            <Flex m={5}>
              <Text>{sortedEvents.date}</Text>
              <Card cardItems={event} />
            </Flex>
          ))}
        </SimpleGrid>
      </VStack>
    );
  };

  return (
    <Suspense fallback={<Spinner size="xl" />}>
      <Await resolve={events}>{renderTable}</Await>
    </Suspense>
  );
}
