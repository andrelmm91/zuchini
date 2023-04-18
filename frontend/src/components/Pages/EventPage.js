import { Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { useLoaderData, Await, useNavigate } from "react-router-dom";

import EventTable from "../events/EventTable";
import EventFrame from "../events/EventFrame";

export default function EventPage() {
  const { events } = useLoaderData();

  return (
    <EventFrame>
      <Suspense fallback={<Spinner size="xl" />}>
        <Await resolve={events}>
          {(loadedEvents) => <EventTable events={loadedEvents} />}
        </Await>
      </Suspense>
    </EventFrame>
  );
}
