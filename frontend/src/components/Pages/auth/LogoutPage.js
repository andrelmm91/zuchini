import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutAction } from "../../async/action/logoutAction";

export default function LogoutPage() {
  const navigate = useNavigate();

  logoutAction();

  setTimeout(() => {
    console.log("logging out");
    navigate("/auth/login");
  }, 1000);

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
          Good bye
        </Heading>
        <Text fontSize="24px" mt={3} mb={2} textColor={"white"}>
          Logout
        </Text>
        <Box mt="5rem" textColor={"white"}>
          <Spinner />{" "}
          <Text fontSize="20px" mt={3} mb={2}>
            redirecting
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
