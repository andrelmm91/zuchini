import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Grid,
  GridItem,
  Spacer,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { Form } from "react-router-dom";
import MiniMap from "../MainMap/MiniMap";
import { useEffect, useState } from "react";

export default function AddeditEvent({ method, event }) {
  // console.log("method", method);

  const navigate = useNavigate();
  const [position, setPosition] = useState(
    method === "patch"
      ? { lat: event?.position?.lat || null, lng: event?.position?.lng || null }
      : { lat: null, lng: null }
  );

  function positionHandler({ lat, lng }) {
    setPosition({ lat: lat, lng: lng });
  }

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      <GridItem>
        <Form method={method}>
          <Stack spacing={4}>
            <Box>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  type={"text"}
                  defaultValue={method === "patch" ? event.title : ""}
                />
              </FormControl>
            </Box>
            <FormControl id="imageUrl" isRequired>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="imageUrl"
                type={"text"}
                defaultValue={method === "patch" ? event.imageUrl : ""}
              />
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="price" name="price" isRequired>
                  <FormLabel>Price</FormLabel>
                  <Input
                    name="price"
                    type={"text"}
                    defaultValue={method === "patch" ? event.price : ""}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="date" isRequired>
                  <FormLabel>Date</FormLabel>
                  <Input
                    name="date"
                    type={"date"}
                    defaultValue={method === "patch" ? event.date : ""}
                  />
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="lat" isRequired>
                  <FormLabel>Latitude</FormLabel>
                  <Input isDisabled defaultValue={position.lat} />
                  <Input name="lat" type="hidden" value={position.lat} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lng" isRequired>
                  <FormLabel>Longitude</FormLabel>
                  <Input isDisabled defaultValue={position.lng} />
                  <Input name="lng" type="hidden" value={position.lng} />
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="timeStart" isRequired>
                  <FormLabel>Start at</FormLabel>
                  <Input
                    name="timeStart"
                    type={"time"}
                    defaultValue={method === "patch" ? event.timeStart : ""}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="timeEnd" isRequired>
                  <FormLabel>Finish at</FormLabel>
                  <Input
                    name="timeEnd"
                    type={"time"}
                    defaultValue={method === "patch" ? event.timeEnd : ""}
                  />
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Button
                loadingText="Submitting"
                size="lg"
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                {method === "patch" ? "Edit" : "Create"}
              </Button>
              <Spacer />
              <Button
                size="lg"
                bg={"gray.400"}
                color={"white"}
                _hover={{
                  bg: "gray.500",
                }}
                onClick={() => navigate("..")}
              >
                Back
              </Button>
            </HStack>
          </Stack>
        </Form>
      </GridItem>
      <GridItem>
        <MiniMap
          MarkerPosition={positionHandler}
          InitialMarkerPos={
            method === "patch"
              ? { lat: position.lat, lng: position.lng }
              : { lat: 52.5, lng: 13.405 }
          }
        />
      </GridItem>
    </Grid>
  );
}
