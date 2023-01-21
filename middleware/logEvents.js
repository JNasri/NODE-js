//
// This middleWare is to emmit log events
//

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
    // UPDATE: '..' is to go to previous dir
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    // add to the log the logItem we creted above
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  // append it to file using fs (we did that in logEvent.js)
  logEvents(
    ` ${req.method} \t ${req.headers.origin} \t ${req.url} \n`,
    "reqLog.txt"
  );
  // log what we need to console (for testing)
  console.log(` ${req.method} \t ${req.path} `);

  //call next to go to next
  next();
};

// export the logEvents to require it in index.js
module.exports = { logger, logEvents };
