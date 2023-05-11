import { Button, VStack } from "@chakra-ui/react";

export default function UserProfile() {
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
    </VStack>
  );
}
