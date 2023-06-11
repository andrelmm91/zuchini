const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  position: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  imageUrl: { type: String, required: true },
  imageAlt: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  timeStart: { type: Date, required: true },
  timeEnd: { type: Date, required: true },
  date: { type: Date, required: true },
  id: { type: String, required: true },
});
