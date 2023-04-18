import { json, redirect } from "react-router-dom";

// // // exporting data
export async function action({ request, params }) {
  const data = await request.formData();
  const dispatchMethod = request.method;

  const eventData = {
    position: { lat: data.get("lat"), lng: data.get("lng") },
    imageUrl: data.get("imageUrl"),
    imageAlt: data.get("title"),
    title: data.get("title"),
    price: data.get("price"),
    timeStart: data.get("timeStart"),
    timeEnd: data.get("timeEnd"),
    date: data.get("date"),
  };

  let url = "http://localhost:8080/events";

  if (dispatchMethod === "PATCH") {
    const eventId = params.eventId;
    url = "http://localhost:8080/events/" + eventId;
  }

  // console.log("url", url);
  // console.log("dispatchMethod", dispatchMethod);
  // console.log("eventData", eventData);

  const response = await fetch(url, {
    method: dispatchMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    console.log("Could not save event:", response);
    throw json({ message: "Could not save event." }, { status: 500 });
  }
  return redirect("/events");
}
