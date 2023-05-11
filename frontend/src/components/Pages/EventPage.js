import { Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { useLoaderData, Await, useNavigate } from "react-router-dom";

import EventTable from "../events/EventTable";
import Frame from "../cards/Frame";

export default function EventPage() {
  const { events } = useLoaderData();

  return (
    <Frame>
      <Suspense fallback={<Spinner size="xl" />}>
        <Await resolve={events}>
          {(loadedEvents) => <EventTable events={loadedEvents} />}
        </Await>
      </Suspense>
    </Frame>
  );
}
