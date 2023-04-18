import { json, defer } from "react-router-dom";

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    console.log("not able to fetch events", response);
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    // console.log("Event Data", resData.events);
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
