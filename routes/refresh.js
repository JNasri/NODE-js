// THIS FILE IS COPIED FROM THE AUTH.JS FILE

//
// This route is to handle refresh tokens
//

// import the express framework
const express = require("express");
// instead of app, we define a router for wach route
const router = express.Router();
// import the register controller
const refreshTokenCont = require("../controllers/refreshTokenCont");

// get route for refresh
router.route("/").get(refreshTokenCont.handleRefreshToken);

module.exports = router;
