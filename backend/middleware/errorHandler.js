const { logStream } = require("./logEvents");

const errorHandler = function (err, req, res, next) {
  logStream(`${err.name}: ${err.message}`, "errorLog.txt");
  res.status(500).send(err.message);
};

module.exports = errorHandler;
