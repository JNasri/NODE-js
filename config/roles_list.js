// this file is for the user rules, the rules can be some DB rules
// or just from the DB in general, but in our case we will clone it simply here

// here we identify each type of role with a number
const ROLES_LIST = {
  Admin: 5150,
  Editor: 1984,
  User: 2001,
};

module.exports = ROLES_LIST;
