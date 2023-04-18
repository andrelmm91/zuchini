import {
  Box,
  SkeletonText,
  HStack,
  IconButton,
  Center,
  Flex,
} from "@chakra-ui/react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import mapStyles from "./mapDarkStyles";
import googlemapsKey from "../../key/googlemapsKey";

function Maps(props) {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googlemapsKey(),
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const center = { lat: 52.5, lng: 13.405 };

  return (
    <Flex>
      <Box
        position="relative"
        left={5}
        top={0}
        h="90vh"
        w="120vw"
        // m={"0 auto 0"}
      >
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            // zoomControl: false,
            streetViewControl: false,
            clickableIcons: false,
            mapTypeControl: false,
            fullscreenControl: false,
            suppressMarkers: true,
            styles: mapStyles(),
          }}
          onLoad={(map) => {
            setMap(map);
            map.setZoom(12);
          }}
          onClick={(ev) => {
            console.log("latitide = ", ev.latLng.lat());
            console.log("longitude = ", ev.latLng.lng());
          }}
        >
          {/* display markers and directions. New Markers should be added one by one */}

          {props.children}

          {/* END  */}
        </GoogleMap>
      </Box>
      <Center
        left={-100}
        top={3}
        position="relative"
        p={1}
        w={"4rem"}
        h={"4rem"}
        // borderRadius="sm"
        m={1}
        bg={"transparent"}
        // shadow="base"
        zIndex="1"
      >
        <HStack m={1} p={0} bg={"transparent"}>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(12);
            }}
          />
        </HStack>
      </Center>
    </Flex>
  );
}

export default Maps;
