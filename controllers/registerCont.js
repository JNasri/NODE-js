// to clone a database, we will create a usersDB object
// that will contain the users and a method to set the users
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
// import needed modules
const fsP = require("fs").promises;
const path = require("path");
// this is A library to help you hash passwords (npm i bcyrpt)
const bcyrpt = require("bcrypt");

//
// function to handle new users
const handleNewUser = async (req, res) => {
  // get the new username and password
  const { user, pwd } = req.body;
  // if any of them not found , return error
  if (!user || !pwd) {
    return res
      .status(400) // 400 *bad request*
      .json({ message: "Username & Password are required" });
  }

  // check for duplicate usernames in the usersDB
  // this variable is going to be true if username is found
  const duplicate = usersDB.users.find((person) => person.Username === user);
  if (duplicate) {
    return res
      .status(409) // 409 *conflict*
      .json({ message: "Username Already Exists" });
  }

  // if all clear , add the user to the DB
  try {
    // first, encrypt the passowrd using the bcrypt library
    // .hash function taked the pwd and salt round (added info you provide)
    const hashedPWD = await bcyrpt.hash(pwd, 10);

    // store the new user
    //
    //create object of the new user
    const newUser = {
      Username: user,
      // UPDATED : add the user role for each new regist as 'user'
      roles: { User: 2001 },
      Password: hashedPWD,
    };
    // add it to the usersDB
    usersDB.setUsers([...usersDB.users, newUser]);
    // write it to our json file
    await fsP.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    // for Testing to make sure it was added
    console.log(usersDB.users);
    // return the success status code
    res.status(201).json({ message: `new user ${user} created` });
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 : server error
  }
};

module.exports = { handleNewUser };
