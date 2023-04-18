import MarkerProvider from "./MarkerProvider";

// const eventDummy = EventDummy();

export default function MarkerCreator({ eventMarkers }) {
  // console.log("eventMarkers", eventMarkers[0].position.lat);
  return (
    <>
      {eventMarkers.map((item) => (
        <MarkerProvider
          key={item.id}
          position={item.position}
          id={item.id}
          imageUrl={item.imageUrl}
          imageAlt={item.imageAlt}
          title={item.title}
          checkedIn={item.checkedIn}
          price={item.price}
          timeStart={item.timeStart}
          timeEnd={item.timeEnd}
        />
      ))}
    </>
  );
}
