import DashboardEvents from "../events/DashboardEvents";
import EventFrame from "../events/EventFrame";

export default function DashboardEventPage() {
  return (
    <EventFrame>
      <DashboardEvents />
    </EventFrame>
  );
}
