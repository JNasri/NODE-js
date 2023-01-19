// this controller to authenticate users (when logging in)
// this file was created after the registerCont.js

// to clone a database, we will create a usersDB object
// that will contain the users and a method to set the users
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

// import bcrypt to unhash password
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  // get the username and password (probably from a login form)
  const { user, pwd } = req.body;
  // if any of them not found , return error
  if (!user || !pwd) {
    return res
      .status(400) // 400 *bad request*
      .json({ message: "Username & Password are required" });
  }
  // Evaluate Username
  const foundUser = usersDB.users.find((person) => person.Username === user);
  if (!foundUser) {
    return res.sendStatus(401); // 401 * unAuthorized *
  }

  // Evaluate Password
  // compare the password given with the passowrd of the foundUser
  const match = await bcrypt.compare(pwd, foundUser.Password);
  if (match) {
    // here we should create JWTs (later on)
    res.json({ message: `user ${user} is logged in!` });
  } else {
    res.sendStatus(401); // 401 * unAuthorized *
  }
};

module.exports = { handleLogin };
