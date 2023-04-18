import { Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";

import Maps from "../MainMap/Maps";
import MarkerCreator from "../Markers/MarkerCreator";

export default function Explore() {
  const { events } = useLoaderData();

  return (
    <Maps>
      <Suspense fallback={<Spinner size="xl" />}>
        <Await resolve={events}>
          {(loadedEvent) => <MarkerCreator eventMarkers={loadedEvent} />}
        </Await>
      </Suspense>
    </Maps>
  );
}
