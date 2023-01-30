/// in MVC (Model - View - Controller)
// The Controller is responsible for showing/taking data
// from the user or to the user
//thats why all code below is in the controller file taken from
// the from api/employees.js

// UPDATE: this was taken from api/employees.js to convert to MVC
// this is replica to a database, later replace it with MongoDB or anything else

// get the data
// UPDATE : now we will change the code to actually work when we add,read,delete...

// MongoDB CODE:
const Employee = require("./../model/Employee");
// UPDATE: no need for the below code because we switched to MongoDB
// const data = {
//   employees: require("../model/employees.json"),
//   setEmployees: function (data) {
//     this.employees = data;
//   },
// };

const getAllEmployees = async (req, res) => {
  // MONGO DB :
  // an empty find() function returns all records
  const employees = await Employee.find();
  // if no employees found
  if (!employees) {
    // return 204 (success with no content)
    res.status(204).josn({ message: "No Employees Found" });
  }
  // if employees found, send them
  res.json(employees);
};

// add an employee to the file
const createNewEmployee = async (req, res) => {
  // MONGO DB :
  // if no name or age were found in the body, send 400 (bad request)
  if (!req?.body?.name || !req?.body?.age) {
    return res.status(400).josn({ message: "Name and Age are Required" });
  }
  // if name and age found, create employee and send res
  try {
    const result = await Employee.create({
      name: req.body.name,
      age: req.body.age,
    });
    // 201 : created successfully
    res.sendStatus(201).josn(result);
  } catch (error) {
    console.error(error);
  }
};

// update an existing employee
const updateEmployee = async (req, res) => {
  // if no id was found in the request body, send 400 (bad request)
  if (!req?.body?.id) {
    return res.status(400).josn({ message: "ID parameter is required " });
  }

  // find employee with id matched with the id from the body
  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  // if no employee was found
  if (!employee) {
    return res
      .status(204) // successful but no content to return
      .json({ message: `Employee ID ${req.body.id} was not found` });
  }
  // if found , start updating after checking for name and age
  if (req?.body?.name) employee.name = req.body.name;
  if (req?.body?.age) employee.age = req.body.age;

  // save changes after update
  const result = await employee.save();

  // send the employee after updation
  res.json(employee);
};

// delete an employee by id
const deleteEmployee = async (req, res) => {
  // if no id was found in the request body, send 400 (bad request)
  if (!req?.body?.id) {
    return res.status(400).josn({ message: "ID parameter is required " });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  // if no employee was found
  if (!employee) {
    return res
      .status(204) // successful but no content to return
      .json({ message: `Employee ID ${req.body.id} was not found` });
  }

  const result = await employee.deleteOne({ _id: req.body.id });

  res.json(result);
};

const getEmployee = async (req, res) => {
  // if no id was found in the request body, send 400 (bad request)
  if (!req?.params?.id) {
    return res.status(400).josn({ message: "ID parameter is required " });
  }

  // get the id of the employee we want to show
  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  // if no employee was found
  if (!employee) {
    return res
      .status(204) // successful but no content to return
      .json({ message: `Employee ID ${req.params.id} was not found` });
  }

  // since its just get , return the employee found
  res.json(employee);
};

// import all of the functions to use in our api
module.exports = {
  getAllEmployees,
  updateEmployee,
  createNewEmployee,
  deleteEmployee,
  getEmployee,
};
