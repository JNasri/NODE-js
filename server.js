// Update : moved the .env require here and deleted it from all other places
require("dotenv").config();
// require the framework 'express'
const express = require("express");
// make the app (server) , so instead of 'server' we use 'app'
const app = express();
const path = require("path");
// require the new logEvent middleWare form the new path + errorHandler
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
// UPDATE: require the middleware to verify the JWTs
const verifyJWT = require("./middleware/verifyJWT");
// UPDATE: require the cookie parser for the refresh token
const cookieParser = require("cookie-parser");
// require the 3rd party MW (3rd type of MW)
const cors = require("cors");
// UPDATE : import corsOptions after moving it to config file to tide things up
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
// Mongoose library for MongoDB require
const mongoose = require("mongoose");
// Connection to MongoDB using mongoose require
const connectDB = require("./config/dbConn");

// connect to mongoDB
connectDB();

// fisrt we need to define a port for our web server,
// the port we are using for Node/Nodemon is for dev
const PORT = process.env.PORT || 3500;

//
// in express we use : app.get , app.post ....etc
// express handles all contentType issues we had in old-server
// 404(bad) or 200(good) is also handled automatically
// express handles these like a waterfall, so you can put-
// the default app.get at the end of them all

//
// this segment is for learning middleWare (2)
//

// we write 'app.use' to apply middelware
// middleWare are used to form data

// SECOND TYPE OF MW: custome middleware //

// let's create a custome logger
// custome mw needs next, built-in doesn't
// we improved the logger to be in the mw folder (check it)
app.use(logger);

// UPDATE: added MW of credentials (must be used before cors)
app.use(credentials);

// then we use this 3rd party mw with our options
app.use(cors(corsOptions));

// FIRST TYPE OF MW: Built-in middleware //

// this middleware to handle url encoded data
app.use(express.urlencoded({ extended: false }));

// this middleware to handle json data
app.use(express.json());

// this middleware to handle cookies
app.use(cookieParser());

// this middleware to handle serve static files (css, images, js files...)
app.use(express.static(path.join(__dirname, "/public")));
// same middleware for the subdir folder
app.use("/subdir", express.static(path.join(__dirname, "/public")));
// provide the route we did in the route folder to handle
// requests for the root

app.use("/", require("./routes/root"));
// provide the route we did in the route folder to handle
// requests for any subdir file
app.use("/subdir", require("./routes/subdir"));
// UPDATE : added the 'register new user' route
app.use("/register", require("./routes/register"));
// UPDATE : added the 'authenticatoin of user' route
app.use("/auth", require("./routes/auth"));
// UPDATE : added the 'logout of user' route
app.use("/logout", require("./routes/logout"));
// UPDATE : added the 'refresh token of user' route
app.use("/refresh", require("./routes/refresh"));
//
//
// anything after the verifyJWT require a JWT token to access
app.use(verifyJWT); // verify only in the employees route
// this is why i moved all other routes to the top, only this route should be verified
app.use("/employees", require("./routes/api/employees"));

//
// at the end, any other requests will go to 404
// * == all
// (1st method:)
// app.get("/*", (req, res) => {
//   // we need to manually send 404 status code
//   // because it will find 404.html and send 200 which we do not want
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

// or we can use app.all('*') to specify 404 error
// (2nd method:)
app.all("*", (req, res) => {
  // we need to manually send 404 status code
  // because it will find 404.html and send 200 which we do not want
  res.status(404);
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

//from the middlware lesson, we can use a mw to handle errors
// and put it in the mw folder (check it)
app.use(errorHandler);

// server needs to listen for a request to be given
// when a request happen at the PORT number, it will run http.createServer
// which is the function written above
// note: this should be always at the end of server.js file
//
// UPDATE: after adding the mongoDB, we need to make suer that
// we only start listening for requests after we established a DB connection
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB Successfully!");
  app.listen(PORT, () => console.log(`server running on port : ${PORT}`));
});
