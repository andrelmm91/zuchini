const { dataBaseName, mongodbPassword } = require("./mongodbPassword");

const mongodbConnection =
  "mongodb+srv://andrelmm91:" +
  mongodbPassword +
  "@cluster1.ryao6zt.mongodb.net/" +
  dataBaseName +
  "?retryWrites=true&w=majority";

exports.mongodbConnection = mongodbConnection;
