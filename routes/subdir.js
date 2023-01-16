//
// This route is to handle req to /views/subdir files
//

// import the express framework
const express = require("express");
// instead of app, we define a router for wach route
// e.g in this file, we have a router for the subdir in /views
const router = express.Router();
// import path
const path = require("path");

// route for the index page
router.get("^/$|/index(.html)?", (req, res) => {
  // send the file
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});

// route for the test page
router.get("/test(.html)?", (req, res) => {
  // send the file
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});

// at the end , we export the code to use it in server.js
module.exports = router;
