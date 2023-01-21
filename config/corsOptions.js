// THIRD TYPE OF MW: 3rd party middleware (cors) //
// CORS = Cross Origin Resource Sharing
// but first, we create a list of domains allowed to access the backend
// that cors will not prevent (liveServer in VSCode , localhost...etc)
const allowedOrigins = require('./allowedOrigins');
// then we set the credentials 
const corsOptions = {
  // get the origin of the request
  origin: (origin, callback) => {
    // if its from the whitelist OR it has no origin(localhost), allow it
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by cors"));
    }
  },
  optionSuccessStatus: 200,
};


module.exports = corsOptions;