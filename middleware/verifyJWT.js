//
// This middleWare is to verify JWTs
//

// require the jwt
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // get the whole auth header from the request that came in
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // check if there is a header and a Bearer (cookie)
  if (!authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401); // 401 * unAuthorized *
  }
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
      // UPDATED after adding the user roles
      req.user = decoded.UserInfo.Username; // assing decoded username to the user
      req.roles = decoded.UserInfo.roles;
      next(); // call next (because this is a middleWare)
    }
  );
};

module.exports = verifyJWT;
