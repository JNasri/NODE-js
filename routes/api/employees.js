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

// this is replica to a database, later replace it with MongoDB or anything else
const data = {};
data.employees = require("../../data/employees.json");

// this is a very good way to handle any http request, rahter than router.get,router.post
// we can have router.route() and specify the http request below
router
  .route("/")
  // get ==> send data
  .get((req, res) => {
    // return all employees in the file
    res.json(data.employees);
  })
  // post ==> gets parameters and save data
  .post((req, res) => {
    // add an employee to the file
    res.json({
      name: req.body.name,
      age: req.body.age,
    });
  })
  // put ==> updates data
  .put((req, res) => {
    // update an existing employee
    res.json({
      name: req.body.name,
      age: req.body.age,
    });
  })
  // delete ==> delete data
  .delete((req, res) => {
    // delete an employee by id
    res.json({
      id: req.body.id,
    });
  });

// maybe the request has a parameter, so we must handle this too
router.route("/:id").get((req, res) => {
  res.json({
    // notice here its req.params , because we're pulling parameter out of the url
    id: req.params.id,
  });
});

// at the end , we export the code to use it in server.js
module.exports = router;
