// this config is to get connection with the database

// require mongoose library for mongoDB
const mongoose = require("mongoose");

// function to connect that we can export
const connectDB = async () => {
  try {
    // this option must be edited first
    await mongoose.set("strictQuery", false);
    // use the connect function that accepts the DB URI (from .env)
    // and some extra options
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
