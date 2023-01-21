//
// This middleWare is to verify JWTs
//

// require the jwt and dotenv configuratoins
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  // get the whole auth header from the request that came in
  const authHeader = req.headers["authorization"];
  // check if there is a header
  if (!authHeader) {
    return res.sendStatus(401); // 401 * unAuthorized *
  }
  console.log(authHeader); // will be: Bearer *token*
  // get only the token from the header
  const token = authHeader.split(" ")[1];
  // verify the token
  jwt.verify(
    // the token
    token,
    // access token secret to verify token
    process.env.ACCESS_TOKEN_SECRET,
    // callback for errors and decoded 
    (err, decoded) => {
      if (err) return res.sendStatus(403); // *403 = forbidden* invalid token
      req.user = decoded.Username; // assing decoded username to the user
      next(); // call next (because this is a middleWare)
    }
  );
};

module.exports = verifyJWT;
