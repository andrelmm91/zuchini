import {
  Box,
  Image,
  Badge,
  Button,
  Flex,
  Spacer,
  Grid,
  GridItem,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiUserFollowLine, RiUserLine } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsInstagram, BsFacebook } from "react-icons/bs";

import { useState } from "react";

export default function Card(props) {
  const { imageUrl, imageAlt, title, checkedIn, price, timeStart, timeEnd } =
    props.cardItems;
  const [favClicked, setFavClicked] = useState(false);
  const [goClicked, setGoClicked] = useState(false);

  return (
    <Box
      maxW="220px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor={"gray"}
      bgColor={"white"}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        maxH="200px"
        maxW="250px"
        margin="auto"
      />
      <Box p="3">
        <Grid templateColumns="repeat(5, 1fr)" alignItems="center">
          <GridItem colSpan={2}>
            <Box display="flex" alignItems="baseline">
              <Badge
                borderRadius="full"
                px="2"
                colorScheme="yellow"
                p={1}
                mr={1}
              >
                {price}$
              </Badge>
              <Badge borderRadius="full" px="2" colorScheme="teal" p={2}>
                {timeStart} - {timeEnd}
              </Badge>
            </Box>
          </GridItem>
          <GridItem colStart={5} colEnd={6}>
            <Button
              // variant={"solid"}
              colorScheme={goClicked ? "teal" : "gray.900"}
              textColor={goClicked ? "white" : "black"}
              size={"xs"}
              mr={0}
              leftIcon={goClicked ? <RiUserFollowLine /> : <RiUserLine />}
              onClick={() => {
                setGoClicked(!goClicked);
              }}
            >
              Go
            </Button>
          </GridItem>
        </Grid>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {title}
        </Box>
        <Box display="flex" mt="2">
          <Grid templateColumns="repeat(5, 1fr)" alignItems="center">
            <GridItem colSpan={2}>
              <Flex gap="1">
                {checkedIn}
                <Spacer>
                  <BsPeopleFill />
                </Spacer>
              </Flex>
            </GridItem>
            <IconButton
              aria-label="twitter"
              variant="ghost"
              size="xs"
              icon={<BsInstagram size="12px" />}
              _hover={{
                bg: "blue.500",
                color: useColorModeValue("white", "gray.700"),
              }}
              isRound
            />
            <IconButton
              aria-label="twitter"
              variant="ghost"
              size="xs"
              icon={<BsFacebook size="12px" />}
              _hover={{
                bg: "blue.500",
                color: useColorModeValue("white", "gray.700"),
              }}
              isRound
            />
            <GridItem colStart={5} colEnd={6}>
              <Button
                ml={2}
                variant={"solid"}
                colorScheme={"teal"}
                size={"xs"}
                mr={0}
                leftIcon={favClicked ? <AiFillStar /> : <AiOutlineStar />}
                onClick={() => {
                  setFavClicked(!favClicked);
                }}
              >
                Save
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
