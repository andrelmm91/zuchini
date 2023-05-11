import AddEditEvent from "../events/AddEditEvent";
import EventFrame from "../cards/Frame";

export default function NewEvent() {
  return (
    <EventFrame>
      <AddEditEvent method={"post"} event={""} />
    </EventFrame>
  );
}
