// import the 'format' from date-fns
const { format } = require("date-fns");
// import the version4 of uuid 
const { v4: uuid } = require("uuid");

// M = months ****  m = minutes
console.log(format(new Date(), "yyyy - MM - dd - HH:mm:ss"));

console.log(uuid());
