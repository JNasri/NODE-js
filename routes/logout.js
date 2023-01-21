// THIS FILE IS COPIED FROM THE REFRESH.JS FILE

//
// This route is to handle log out (delete refresh and access tokens)
//

// import the express framework
const express = require("express");
// instead of app, we define a router for wach route
const router = express.Router();
// import the register controller
const logoutCont = require("../controllers/logoutCont");

// get route for refresh
router.route("/").get(logoutCont.handleLogout);

module.exports = router;
