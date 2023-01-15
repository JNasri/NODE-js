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

// THIRD TYPE OF MW: 3rd party middleware (cors) //
// CORS = Cross Origin Resource Sharing
// but first, we create a list of domains allowed to access the backend
// that cors will not prevent (liveServer in VSCode , localhost...etc)
const whitelist = ["http://127.0.0.0:5500", "http://localhost:3500"];
const corsOptions = {
  // get the origin of the request
  origin: (origin, callback) => {
    // if its from the whitelist OR it has no origin(localhost), allow it
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by cors"));
    }
  },
  optionSuccessStatus: 200,
};
// then we use this 3rd party mw with our options
app.use(cors(corsOptions));

// FIRST TYPE OF MW: Built-in middleware //

// this middleware to handle url encoded data
app.use(express.urlencoded({ extended: false }));

// this middleware to hanle json data
app.use(express.json());

// this middleware to handle serve static files (css, images, js files...)
app.use(express.static(path.join(__dirname, "/public")));

//
// this segment is for intro to express (1)
//
// express takes regExp as the route so you can specify
// ^/$ ==only / OR index(.html)? ?== 0 or 1
app.get("^/$|/index(.html)?", (req, res) => {
  // these are two ways to call files, all works the same
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// define new page
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

// now lets try to redirect the old page
// to the new page like we did in old-server
app.get("/old-page(.html)?", (req, res) => {
  // 302 be default , but we make it 301 to tell search engines
  // to know that old page has moved to new page
  res.redirect(301, "/new-page.html");
});

//
// Nested Route
//

// nested route handlers , we can see a new parameter 'next'
// which we execute at the end to start the next route
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

// another way is to define the methods befor like this:
const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
  res.send("finished!!");
};
// then call them like array as parameter
app.get("/chain(.html)?", [one, two, three]);

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
