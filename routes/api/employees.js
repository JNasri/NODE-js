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

//UPDATE: this is an update after adding the user roles
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

// this is a very good way to handle any http request, rahter than router.get,router.post
// we can have router.route() and specify the http request below
router
  .route("/")
  // get ==> send data
  .get(employeesCont.getAllEmployees)

  // post ==> gets parameters and save data
  // UPDATE: added verifyRoles cuz not anyone can create new employee
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesCont.createNewEmployee
  )

  // put ==> updates data
  // UPDATE: added verifyRoles cuz not anyone can update new employee
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesCont.updateEmployee
  )

  // delete ==> delete data
  // UPDATE: only an admin can delete an employee
  .delete(verifyRoles(ROLES_LIST.Admin), employeesCont.deleteEmployee);

// maybe the request has a parameter, so we must handle this too
router.route("/:id").get(employeesCont.getEmployee);

// at the end , we export the code to use it in server.js
module.exports = router;
