import { Marker, InfoWindow } from "@react-google-maps/api";
import { renderToString } from "react-dom/server";
import Card from "../cards/Card";
import "../MainMap/mapMod.css";
import { useState } from "react";
import { FaMapMarker } from "react-icons/fa";

// const google = window.google;

function getMarkerIcon(color) {
  const iconUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    renderToString(<FaMapMarker style={{ color }} />)
  )}`;
  return {
    url: iconUrl,
    scaledSize: new window.google.maps.Size(50, 50),
  };
}

export default function MarkerProvider(props) {
  const [popUp, setPopUp] = useState(false);
  const { id, position } = props;
  const positionMarker = {
    lat: Number(position.lat),
    lng: Number(position.lng),
  };

  return (
    <Marker
      id={id}
      key={id}
      // icon={MarkerIcon}
      icon={getMarkerIcon("#8F43EE")}
      position={positionMarker}
      onClick={() => {
        setPopUp(!popUp);
      }}
      // onMouseOver={() => {
      //   setPopUp(true);
      // }}
      // onMouseOut={() => {
      //   setInterval(() => {
      //     setPopUp(false);
      //   }, 1000);
      // }}
    >
      {popUp && (
        <InfoWindow
          position={positionMarker}
          onCloseClick={() => {
            setPopUp(!popUp);
          }}
          // onMouseOut={() => {
          //   setPopUp(false);
          // }}
          // onMouseOver={() => {
          //   setPopUp(true);
          // }}
          options={{
            closeBoxURL: ``,
            enableEventPropagation: true,
            // pixelOffset: new window.google.maps.Size(20, 40),
          }}
        >
          <Card cardItems={props} />
        </InfoWindow>
      )}
    </Marker>
  );
}
