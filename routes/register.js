//
// This route is to handle users registeration
//

// import the express framework
const express = require("express");
// instead of app, we define a router for wach route
const router = express.Router();
// import the register controller
const registerCont = require("../controllers/registerCont");

router.route("/").post(registerCont.handleNewUser);

module.exports = router;
