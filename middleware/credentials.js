//
// This middleWare is make credentials true (for the front end)
//

// require allowd origins that we set up in the config file
const allowedOrigins = require("../config/allowedOrigins");

// make credentials allowed if the origin is valid
const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  // call next cuz its a middle ware
  next();
};

module.exports = credentials;
