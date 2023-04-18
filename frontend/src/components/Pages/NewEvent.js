import AddEditEvent from "../events/AddEditEvent";
import EventFrame from "../events/EventFrame";

export default function NewEvent() {
  return (
    <EventFrame>
      <AddEditEvent method={"post"} event={""} />
    </EventFrame>
  );
}
