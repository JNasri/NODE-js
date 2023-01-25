// Everything in Mongoose starts with a Schema.
// Each schema maps to a MongoDB collection and defines the shape of the documents
// within that collection.

// here we will create a Schema for the employees
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  // name attribute
  name: {
    type: String,
    required: true,
  },
  // age attribute
  age: {
    type: Number,
    required: true,
  },
});

// When you call mongoose.model() on a schema, Mongoose compiles a model for you
module.exports = mongoose.model("Employee", employeeSchema);
// NOTE NOTE NOTE :
// Mongoose automatically looks for the plural, lowercased version of your model name
// IN MY CASE: 'employees' must be my collection in the DB
