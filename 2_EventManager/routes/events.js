const express = require("express");

const { getAll, get, add, replace, remove } = require("../data/event");
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
  isValidNumber,
  isValidTime,
} = require("../util/validation");

const router = express.Router();

// // gets and send all information
router.get("/", async (req, res, next) => {
  try {
    const allEvents = await getAll();
    console.log(
      "DB responsed ok with " + Object.keys(allEvents).length + " events"
    );
    res.json({ events: allEvents });
  } catch (error) {
    next(error);
  }
});

// gets and send only one information per ID
router.get("/:id", async (req, res, next) => {
  try {
    const event = await get(req.params.id);
    res.json({ event: event });
  } catch (error) {
    next(error);
  }
});

// // add a new information
router.post("/", async (req, res, next) => {
  const data = req.body;
  // console.log(data);
  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = "Invalid title.";
  }
  if (!isValidImageUrl(data.imageUrl)) {
    errors.imageUrl = "Invalid image URL.";
  }
  if (!isValidNumber(data.price)) {
    errors.price = "Invalid description.";
  }
  if (!isValidDate(data.date)) {
    errors.date = "Invalid date.";
  }
  if (!isValidTime(data.timeStart)) {
    errors.timeStart = "Invalid start End.";
  }
  if (!isValidTime(data.timeEnd)) {
    errors.timeEnd = "Invalid time End.";
  }
  if (!isValidNumber(data.position.lat) && !isValidNumber(data.position.lng)) {
    errors.position = "Invalid position.";
  }

  console.log("I passed here");
  console.log(errors);

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the event failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "Event saved.", event: data });
  } catch (error) {
    next(error);
  }
});

// // edit a new information
router.patch("/:id", async (req, res, next) => {
  const data = req.body;
  const eventId = req.params.id;
  // console.log(data);

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = "Invalid title.";
  }
  if (!isValidImageUrl(data.imageUrl)) {
    errors.imageUrl = "Invalid image URL.";
  }
  if (!isValidNumber(data.price)) {
    errors.price = "Invalid description.";
  }
  if (!isValidDate(data.date)) {
    errors.date = "Invalid date.";
  }
  if (!isValidTime(data.timeStart)) {
    errors.timeStart = "Invalid start End.";
  }
  if (!isValidTime(data.timeEnd)) {
    errors.timeEnd = "Invalid time End.";
  }
  if (!isValidNumber(data.position.lat) && !isValidNumber(data.position.lng)) {
    errors.position = "Invalid position.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the event failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(eventId, data);
    res.json({ message: "Event updated.", event: data });
  } catch (error) {
    next(error);
  }
});

// delete a new information
router.delete("/:id", async (req, res, next) => {
  const eventId = req.params.id;

  try {
    await remove(eventId);
    res.json({ message: "Event deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
