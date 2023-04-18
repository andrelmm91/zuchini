import { json } from "react-router-dom";

export async function deleteAction(eventId) {
  console.log("eventId", eventId);

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: "DELETE",
  });

  console.log(response);

  if (!response.ok) {
    console.log("event couldnt be deleted.");

    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }
  return response;
}
