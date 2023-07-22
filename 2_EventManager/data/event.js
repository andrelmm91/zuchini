const fs = require("node:fs/promises");
const Event = require("../MongoDB/models");

const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");

// read database
async function readData() {
  const data = await fs.readFile("events.json", "utf8");
  return JSON.parse(data);
}
// save
async function writeData(data) {
  // // adding to json file
  await fs.writeFile("events.json", JSON.stringify(data));
}

//////////////////////
/////////////////////////
//// CRUD operations
//get all
async function getAll() {
  const allEvents = await Event.find()
    .then((events) => {
      return events;
    })
    .catch((err) => {
      // Handle the error if necessary
      console.error("Error:", err);
    });
  return allEvents;

  // ////
  // const storedData = await readData();
  // if (!storedData.events) {
  //   throw new NotFoundError("Could not find any events.");
  // }
  // return storedData.events;
}

//get per id
async function get(id) {
  const storedData = await readData();
  if (!storedData.events || storedData.events.length === 0) {
    throw new NotFoundError("Could not find any events.");
  }

  const event = storedData.events.find((ev) => ev.id === id);
  if (!event) {
    throw new NotFoundError("Could not find event for id " + id);
  }
  return event;
}

// add
async function add(data) {
  ///////////////////////////
  //implementing Mongoose tro save into mongoDB
  console.log("I passed here 1");
  const eventCreated = new Event({
    id: generateId(),
    position: {
      lat: data.position.lat,
      lng: data.position.lng,
    },
    imageUrl: data.imageUrl,
    imageAlt: data.imageAlt,
    title: data.title,
    price: data.price,
    timeStart: data.timeStart,
    timeEnd: data.timeEnd,
    date: data.date,
  });
  //saving
  console.log("I passed here 2");

  // eventCreated.save(function (err, doc) {
  //   if (err) return console.error(err);
  //   console.log("Document inserted succussfully!");
  // });

  eventCreated
    .save()
    .then(() => {
      console.log("Event saved in MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });

  ////////////
  const storedData = await readData();
  storedData.events.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

//edit
async function replace(eventId, data) {
  const storedData = await readData();

  if (!storedData.events || storedData.events.length === 0) {
    throw new NotFoundError("Could not find any events.");
  }

  const index = storedData.events.findIndex((ev) => ev.id === eventId);
  if (index < 0) {
    throw new NotFoundError("Could not find event for id " + eventId);
  }

  storedData.events[index] = { ...data, id: eventId };

  await writeData(storedData);
}

//remove
async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.events.filter((ev) => ev.id !== id);
  await writeData({ events: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
