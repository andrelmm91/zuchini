import {
  Box,
  SkeletonText,
  HStack,
  IconButton,
  Center,
  Flex,
} from "@chakra-ui/react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";
import mapStyles from "./mapDarkStyles";

export default function MiniMap({ MarkerPosition, InitialMarkerPos }) {
  const [markerPos, setMarkerPosp] = useState({
    lat: Number(InitialMarkerPos.lat),
    lng: Number(InitialMarkerPos.lng),
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDAGsB_EaEGhpAs5ac5MQ-3lFg64skRaRg",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <SkeletonText />;
  }

  function getLocationHandler(lat, lng) {
    setMarkerPosp({ lat: lat, lng: lng });
    MarkerPosition({ lat: lat, lng: lng });
  }

  return (
    <Flex>
      <Box
        position="relative"
        left={5}
        top={0}
        h="40rem"
        w="30rem"
        // m={"0 auto 0"}
      >
        <GoogleMap
          center={markerPos}
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
            map.setZoom(12);
          }}
          onClick={(ev) => {
            getLocationHandler(ev.latLng.lat(), ev.latLng.lng());
          }}
        >
          <Marker id={"markerEvent"} position={markerPos} />
        </GoogleMap>
      </Box>
    </Flex>
  );
}
