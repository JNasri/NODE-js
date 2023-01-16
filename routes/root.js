//
// This route is to handle req to the root (/views) files
//

// import the express framework
const express = require("express");
// instead of app, we define a router for wach route
// e.g in this file, we have a router for the subdir in /views
const router = express.Router();
// import path
const path = require("path");

//
// this segment is for intro to express (1)
//
// app.get takes regExp as the route so you can specify
// ^/$ ==only / OR index(.html)? ?== 0 or 1
router.get("^/$|/index(.html)?", (req, res) => {
  // these are two ways to call files, all works the same
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

// define new page
router.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

// now lets try to redirect the old page
// to the new page like we did in old-server
router.get("/old-page(.html)?", (req, res) => {
  // 302 be default , but we make it 301 to tell search engines
  // to know that old page has moved to new page
  res.redirect(301, "/new-page.html");
});

//
// Nested Route
//

// nested route handlers , we can see a new parameter 'next'
// which we execute at the end to start the next route
router.get(
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
router.get("/chain(.html)?", [one, two, three]);

// at the end , we export the code to use it in server.js
module.exports = router;
