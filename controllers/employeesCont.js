/// in MVC (Model - View - Controller)
// The Controller is responsible for showing/taking data
// from the user or to the user
//thats why all code below is in the controller file taken from
// the from api/employees.js

// UPDATE: this was taken from api/employees.js to convert to MVC
// this is replica to a database, later replace it with MongoDB or anything else

// get the data
// UPDATE : now we will change the code to actually work when we add,read,delete...
const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  // return all employees in the file
  res.json(data.employees);
};

// add an employee to the file
const createNewEmployee = (req, res) => {
  // create employee obj
  const newEmployee = {
    // take the id of the last employee and add 1 to it
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    name: req.body.name,
    age: req.body.age,
  };

  // if name or age was not sent for some reason
  if (!newEmployee.name || !newEmployee.age) {
    return res
      .status(400)
      .json({ message: "Error! name and age are required" });
  }

  // set data to the new employee
  // ... = instead of data.setEmployees.id , data.setEmolyees.name etc...
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees); // 201 == created new record successfully
};

// update an existing employee
const updateEmployee = (req, res) => {
  // get the id of the employee we want to update
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  // if id not found send error message
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} was not found` });
  }
  // if found , start updating after checking for name and age
  if (req.body.name) employee.name = req.body.name;
  if (req.body.age) employee.age = req.body.age;

  // now we filter the data by creating an array that doesn't have the employee
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  // now , we insert the updated employee to the filteredArray
  const unsortedArray = [...filteredArray, employee];
  // finally, the data is not sorted, so we need to sort it
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  // send the employee after updation
  res.json(data.employees);
};

// delete an employee by id
const deleteEmployee = (req, res) => {
  // get the id of the employee we want to delete
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  // if id not found send error message
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} was not found` });
  }

  // if found, we filter the data by creating an array that doesn't have the employee
  const filteredArray = data.employees.filter((emp) => emp.id !== req.body.id);
  // since its delete, we just update the employees with the new array
  data.setEmployees([...filteredArray]);
  // and send the employee after deletion
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  // get the id of the employee we want to show
  const employee = data.employees.find(
    // notice here its req.params , because we're pulling parameter out of the url
    (emp) => emp.id === parseInt(req.params.id)
  );
  // if id not found send error message
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} was not found` });
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
