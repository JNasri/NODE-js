// import the 'format' from date-fns
const { format } = require("date-fns");
// import the version4 of uuid
const { v4: uuid } = require("uuid");

// importt fs, fsPromises and path
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// log events with a message parameter
const logEvents = async (message, logName) => {
  // M = months ****  m = minutes
  const dateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const id = uuid();
  const logItem = dateTime + "\t\t" + id + "\t\t" + message;
  // FOR TESTING
  console.log(logItem);
  try {
    // if 'logs' dir doesn't exist, create one
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    // add to the log the logItem we creted above
    await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
  } catch (err) {
    console.log(err);
  }
};

// export the logEvents to require it in index.js
module.exports = logEvents;
