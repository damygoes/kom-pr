const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logStream = async (message, logName) => {
  const dateTime = `${format(new Date(), "dd-MM-yyyy\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (error) {}
};

const logger = (req, res, next) => {
  logStream(
    `${req.method}\t${req.headers.origin}\t${req.url}\n`,
    "requestsLog.txt"
  );
  next();
};

module.exports = { logStream, logger };
