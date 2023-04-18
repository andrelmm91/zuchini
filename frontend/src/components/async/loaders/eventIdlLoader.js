import { defer, json, redirect } from "react-router-dom";

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  // console.log("responset", response);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    // console.log("resData.event", resData.event);

    return resData.event;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;
  // console.log("id", id);

  return defer({
    event: await loadEvent(id),
  });
}

// export async function action({ params, request }) {
//   const eventId = params.eventId;
//   const method = params.method;
//   const data = await request.formData();

//   console.log("eventId", eventId);
//   console.log("method", method);
//   console.log("request", data);

//   // const response = await fetch("http://localhost:8080/events/" + eventId, {
//   //   method: request.method,
//   // });

//   // if (!response.ok) {
//   //   throw json(
//   //     { message: "Could not delete event." },
//   //     {
//   //       status: 500,
//   //     }
//   //   );
//   // }

//   return redirect("/events");
// }
