const fs = require("fs");

// to create a directory :
// fs.mkdir("./new", (err) => {
//   if (err) throw err;
//   console.log("New Directory Created!");
// });

// remember error if files not existing? we can chekc if a file
// exists or not (or the directory) to prevent double files or anything else
// by using if statement with fs.existsSync(*dir*)
if (!fs.existsSync("./new")) {
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("New Directory Created!");
  });
}

// if you have a case where if a file/directory exists, delete it
// we do the same logic as the above
if (fs.existsSync("./new")) {
  fs.rmdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory Deleted!");
  });
}

const test = async () => {};
