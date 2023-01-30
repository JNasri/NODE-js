// this controller to authenticate users (when logging in)
// this file was created after the registerCont.js

// MongoDB CODE:
const User = require("./../model/User");
// UPDATE: no need for the below code because we switched to MongoDB
// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
// // import needed modules
// const fsP = require("fs").promises;
// const path = require("path");
//

// import bcrypt to unhash password
const bcrypt = require("bcrypt");

// the below import is from the JWT learning section
const jwt = require("jsonwebtoken");

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
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    return res.sendStatus(401); // 401 * unAuthorized *
  }

  // Evaluate Password
  // compare the password given with the passowrd of the foundUser
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // here we must get the user roles of the found user
    const UserRoles = Object.values(foundUser.roles);

    // 1st : Access Token
    //
    const accessToken = jwt.sign(
      // 1: payload (our username) , do not pass sensitive info (like pwd)
      // UPDATED: add the user roles to the payload
      {
        UserInfo: {
          username: foundUser.username,
          roles: UserRoles,
        },
      },
      // 2: we need the access token secret to create a token
      process.env.ACCESS_TOKEN_SECRET,
      // 3: expiration time
      { expiresIn: "30s" }
    );
    // 2nd : Refresh Token
    //
    const refreshToken = jwt.sign(
      // 1: payload (our username) , do not pass sensitive info (like pwd)
      { username: foundUser.username },
      // 2: we need the refresh token secret to create a token
      process.env.REFRESH_TOKEN_SECRET,
      // 3: expiration time
      { expiresIn: "1d" } // one day
    );

    // now we must save the refresh token with the current user,
    // this lets us validate the refresh token if the curren user logs out
    // before the expire time ( 1 day )
    //

    // add the refresh token to the logged in user
    foundUser.refreshToken = refreshToken;
    // save after adding refresh token to foundUser
    const result = await foundUser.save();
    // for testing
    console.log(result);

    // THE FOLLOWING IS OLD CODE BEFORE MONGODB
    // const otherUsers = usersDB.users.filter(
    //   (person) => person.Username !== foundUser.Username
    // );
    // // add the refrethTokin to the logged in user's json object
    // const currentUser = { ...foundUser, refreshToken };
    // // update the DB by : other users + current user
    // usersDB.setUsers([...otherUsers, currentUser]);
    // // store all in the DB ( in our case a txt file) with the refresh token added
    // // to the current user
    // await fsP.writeFile(
    //   path.join(__dirname, "..", "model", "users.json"),
    //   JSON.stringify(usersDB.users)
    // );

    // fianlly, we need to send both tokens to the user ,
    // refreshToken as a cookie and accessToken as JSON
    res.cookie(
      "jwt", // name of the cookie
      refreshToken, // data of tha cookie
      {
        // some rules
        httpOnly: true, // httpOnly cookie : to not allow access by JS
        maxAge: 24 * 60 * 60 * 1000, // this is equal to 1 day
        sameSite: "None", // added new (for the front end )
        // secure: true, // added new (for the front end ) so it be http(s)
        // note that secure: true doesn't work with thoudnerClinet (dev test)
        // but will work in real porjects
      }
    );
    res.json({ accessToken }); // in the front end , this must be stored in the memory
  } else {
    res.sendStatus(401); // 401 * unAuthorized *
  }
};

module.exports = { handleLogin };
