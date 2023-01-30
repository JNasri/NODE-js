// the logout controller must delete the refrsh token
// to make sure the user cannot access the protected routes again
// NOTE: on the front end, we must delte the access token from the memory
// when the user makes a new authCont.js request he will be grante
// a new access+refresh tokens for the duration of his visit

// THIS FILE WAS COPIED FROM THE refreshTokenCont.JS FILE

// this controller is to handle log out

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

const handleLogout = async (req, res) => {
  // note for the front end: also delete the access token from the memory
  //
  // here we will delete the refresh token ( the httpOnly cookie )

  // get the cookies from the request
  const cookies = req.cookies;
  // if cookies or jwt not found , return error
  if (!cookies?.jwt) {
    return res.sendStatus(204); // 204 * success request but no content *
  }
  // extract the token from the cookie we got
  const refreshToken = cookies.jwt;

  // check if the refresh token is in the DB
  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  // if the following condition is true, that means we have a cookie
  // but its not in the DB, so we clear the cookie we have
  if (!foundUser) {
    // command to clear the cookie ( takes cookie name and same options from previous)
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
    return res.sendStatus(204); // 204 * success request but no content *
  }

  // if we reach here, that means cookie is found in the DB

  // delete the refresh token from the user who logged out
  foundUser.refreshToken = "";
  // save after removing refresh token from foundUser
  const result = await foundUser.save();
  // for testing
  console.log(result);

  // THE FOLLOWING IS OLD CODE BEFORE MONGODB
  // const otherUsers = usersDB.users.filter(
  //   (person) => person.refreshToken !== foundUser.refreshToken
  // );
  // // set the refresh token to '' in the foundUser's object
  // const currentUser = { ...foundUser, refreshToken: "" };
  // // add otherUsers with the currentUser after clearing refresh token
  // usersDB.setUsers([...otherUsers, currentUser]);
  // // update the DB ( txt file in our case)
  // await fsP.writeFile(
  //   path.join(__dirname, "..", "model", "users.json"),
  //   JSON.stringify(usersDB.users)
  // );
  //
  //

  // command to clear the cookie after it was deleted form the DB
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.sendStatus(204); // 204 * success request but no content *
};

module.exports = { handleLogout };
