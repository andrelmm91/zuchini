const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  id: { type: String, required: true },
  position: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  imageUrl: { type: String, required: true },
  imageAlt: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Event", eventSchema, "collectionEvent");
