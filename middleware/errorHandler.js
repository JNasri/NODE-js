//
// This middleWare is to emmit errors
//

const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message} \n`, "errLog.txt");
  console.error(err.status);
  res.status(500).send(err.message);
};

module.exports = errorHandler;
