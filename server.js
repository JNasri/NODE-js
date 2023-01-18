// require the framework 'express'
const express = require("express");
// make the app (server) , so instead of 'server' we use 'app'
const app = express();
const path = require("path");
// require the new logEvent file form the new path
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
// require the 3rd party MW (3rd type of MW)
const cors = require("cors");
// UPDATE : import corsOptions after moving it to config file to tide things up
const corsOptions = require("./config/corsOptions");

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

// then we use this 3rd party mw with our options
app.use(cors(corsOptions));

// FIRST TYPE OF MW: Built-in middleware //

// this middleware to handle url encoded data
app.use(express.urlencoded({ extended: false }));

// this middleware to hanle json data
app.use(express.json());

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
app.listen(PORT, () => console.log(`server running on port : ${PORT}`));
