import { useColorModeValue } from "@chakra-ui/react";

import { Flex, Box, Stack } from "@chakra-ui/react";

export default function Frame(props) {
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"100rem"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("#D8D8D8", "gray.800")}
          boxShadow={"lg"}
          p={8}
        >
          {props.children}
        </Box>
      </Stack>
    </Flex>
  );
}
