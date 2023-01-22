// THIS FILE WAS COPIED FROM THE AUTHCONT.JS FILE

// this controller is to handle refresh tokens

// to clone a database, we will create a usersDB object
// that will contain the users and a method to set the users
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

// the below imports are from the JWT learning section
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  // get the cookies from the request
  const cookies = req.cookies;
  // if cookies or jwt not found , return error
  if (!cookies?.jwt) {
    return res.sendStatus(401); // 401 * unAuthorized *
  }
  // verify for testing
  console.log(cookies.jwt);
  // extract the token from the cookie we got
  const refreshToken = cookies.jwt;

  // Evaluate the token of the user with the token we got
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    return res.sendStatus(403); // 403 * forbidden *
  }

  // verify the JWT
  jwt.verify(
    // the recieved refresh token
    refreshToken,
    // the refreth token secret
    process.env.REFRESH_TOKEN_SECRET,
    // callback for errors and encoded
    (err, decoded) => {
      // *403 = forbidden* invalid token
      if (err || foundUser.Username !== decoded.Username)
        return res.sendStatus(403);
      // create a new access token after the refresh token if verified
      //

      // here we must get the user roles of the found user
      const UserRoles = Object.values(foundUser.roles);
      const accessTokne = jwt.sign(
        // 1: payload (our username) , do not pass sensitive info (like pwd)
        // UPDATED: add the user roles to the payload
        {
          UserInfo: {
            Username: foundUser.Username,
            roles: UserRoles,
          },
        },
        // 2: we need the access token secret to create a token
        process.env.ACCESS_TOKEN_SECRET,
        // 3: expiration time
        { expiresIn: "30s" }
      );
      // finally send the access token created to the user
      res.json({ accessTokne });
    }
  );
};

module.exports = { handleRefreshToken };
