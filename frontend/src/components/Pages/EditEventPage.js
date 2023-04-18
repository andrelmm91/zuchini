import { Spinner } from "@chakra-ui/react";
import AddEditEvent from "../events/AddEditEvent";
import EventFrame from "../events/EventFrame";

import { useRouteLoaderData } from "react-router-dom";
import { Suspense, Await } from "react";

export default function EditEventPage() {
  const { event } = useRouteLoaderData("eventId");

  return (
    <EventFrame>
      <Suspense fallback={<Spinner size="xl" />}>
        {/* <Await resolve={event}>
          {(loadedEvents) => ( */}
        <AddEditEvent method={"patch"} event={event} />
        {/* )}
        </Await> */}
      </Suspense>
    </EventFrame>
  );
}
