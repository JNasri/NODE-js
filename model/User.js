// Everything in Mongoose starts with a Schema.
// Each schema maps to a MongoDB collection and defines the shape of the documents
// within that collection.

// here we will create a Schema for the Users
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // user name (required)
  username: {
    type: String,
    required: true,
  },
  // roles (default is user)
  roles: {
    User: {
      type: Number,
      default: 2001, // default value if not specified, we know that 2001 is a user
    },
    Editor: {
      type: Number,
    },
    Admin: {
      type: Number,
    },
  },
  // pwd is required of course
  password: {
    type: String,
    required: true,
  },
  // refreshToken is not required all the time
  refreshToken: {
    type: String,
  },
});

// When you call mongoose.model() on a schema, Mongoose compiles a model for you
module.exports = mongoose.model("User", userSchema);
// NOTE NOTE NOTE :
// Mongoose automatically looks for the plural, lowercased version of your model name
// IN MY CASE: 'users' must be my collection in the DB
