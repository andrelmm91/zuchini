const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const eventRoutes = require("./routes/events");
const { mongodbConnection } = require("./MongoDB/mongodbConnection");

const app = express();

// ---------------------------- //
// ---------------------------- //

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/events", eventRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

// // app listerning with mongodb
// app.listen(8080);

// Settings up a mongoDB via Mongoose
//// ////

mongoose
  .connect(mongodbConnection)
  .then((result) => {
    console.log("Connection Successful!");
    app.listen(8080);
  })
  .catch((err) => console.log(err));
