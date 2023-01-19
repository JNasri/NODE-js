//
// This route is to handle users authentication
//

// import the express framework
const express = require("express");
// instead of app, we define a router for wach route
const router = express.Router();
// import the register controller
const authCont = require("../controllers/authCont");

router.route("/").post(authCont.handleLogin);

module.exports = router;
