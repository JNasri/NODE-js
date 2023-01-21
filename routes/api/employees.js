//
// This route is to handle req to the /employees
//

// import the express framework
const express = require("express");
// instead of app, we define a router for wach route
// e.g in this file, we have a router for the subdir in /views
const router = express.Router();
// import path
const path = require("path");

// UPDATE: import the controller after converting to MVC
const employeesCont = require("../../controllers/employeesCont");

// this is a very good way to handle any http request, rahter than router.get,router.post
// we can have router.route() and specify the http request below
router
  .route("/")
  // get ==> send data
  .get(employeesCont.getAllEmployees)
  // post ==> gets parameters and save data
  .post(employeesCont.createNewEmployee)
  // put ==> updates data
  .put(employeesCont.updateEmployee)
  // delete ==> delete data
  .delete(employeesCont.deleteEmployee);

// maybe the request has a parameter, so we must handle this too
router.route("/:id").get(employeesCont.getEmployee);

// at the end , we export the code to use it in server.js
module.exports = router;
