const MongoClient = require("mongodb").MongoClient;
const { mongodbConnection } = require("./mongodbPassword");

let _db = {};

function mongoConnect(callback) {
  MongoClient.connect(mongodbConnection)
    .then((client) => {
      console.log("connected");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "no database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
