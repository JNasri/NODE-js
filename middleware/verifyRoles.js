// REST operator ... to pass as many parameters as needed
const verifyRoles = (...allwoedRoles) => {
  // here we must return the typical req res next
  return (req, res, next) => {
    // if there is no req or there is a req but no roles
    if (!req?.roles) {
      return res.sendStatus(401); // unAuthorized
    }
    // array with the allowd roles that were passed in
    const rolesArray = [...allwoedRoles];
    // for testing
    // console.log(rolesArray);
    // console.log(req.roles);
    // result to check if the roles coming from the JWT (req.roles)
    // are the same as the roles passed in the function
    const result = req.roles
      // .map the roles together, we need only one true to make it valid so we use .find
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    // this means we did not fine any true cases from the mapping
    if (!result) {
      return res.sendStatus(401); // unAuthorized
    } else {
      // the user is authorized, so we call next for the next route cuz we are in a MW
      next();
    }
  };
};

module.exports = verifyRoles;
