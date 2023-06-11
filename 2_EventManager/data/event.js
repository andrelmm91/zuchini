const fs = require("node:fs/promises");

const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");

// read database
async function readData() {
  const data = await fs.readFile("events.json", "utf8");
  return JSON.parse(data);
}
// save
async function writeData(data) {
  await fs.writeFile("events.json", JSON.stringify(data));
}

//////////////////////
/////////////////////////
//// CRUD operations
//get all
async function getAll() {
  const storedData = await readData();
  if (!storedData.events) {
    throw new NotFoundError("Could not find any events.");
  }
  return storedData.events;
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
