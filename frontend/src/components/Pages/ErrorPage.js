import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  return (
    <Box backgroundColor={"black"} h="100vh" w="100vw">
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, white, teal.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="24px" mt={3} mb={2} textColor={"white"}>
          Page Not Found
        </Text>
        <Text color={"gray.400"} mb={6}>
          The page you're looking for does not seem to exist
        </Text>

        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
        >
          <NavLink to="/" end>
            Go to Home
          </NavLink>
        </Button>
      </Box>
    </Box>
  );
}
