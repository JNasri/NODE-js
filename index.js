// WOKRING WITH FILES

// first, we need to require the fs (FileSystem) module
const fs = require("fs");
// we will use another path method in the write , so we require:
const path = require("path");

// to read a file, use readFile function and pass the path of text file
// note that there is a callback function with (err) and (data)
// we can also define the encoding in the parametere instead of toString()
fs.readFile("./files/starter.txt", "utf8", (err, data) => {
  if (err) throw err; // if
  // console.log(data.toString()); // else
  console.log(data);
});

// moreover, functions in Node are asynchronous meaning that
// this log down below will execute before the readfile, its faster
console.log("Hello.....");

// to write into a file, use writeFile function and pass the path of text file
// with the message we want to write, (if file not existing it will create it)
// note that there is a callback function with only (err)
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "this is a message",
  (err) => {
    if (err) throw err; // if
    // console.log(data.toString()); // else
    console.log("Operation Completed");
  }
);

// to update a file, use appendFile function and pass the path of text file
// with the message we want to write, (if file not existing it will create it)
// note that there is a callback function with only (err)
// notice the console, order is different because node is asynchronous
fs.appendFile(
  path.join(__dirname, "files", "reply.txt"),
  "this is an updated message",
  (err) => {
    if (err) throw err; // if
    // console.log(data.toString()); // else
    console.log("Update Completed");
  }
);

// to delete a file, use unlike function and pass the path of text file
// note that there is a callback function with only (err)
// notice the console, order is different because node is asynchronous
fs.unlink(path.join(__dirname, "files", "lorem.txt"), (err) => {
  if (err) throw err; // if
  // console.log(data.toString()); // else
  console.log("Deletion Completed");
});

// now, if there are errors in any operation, we need to handle it using 'proccess'
process.on("uncaughtException", (err) => {
  console.error("" + err); //print the error
  process.exit(1); // exit porgram
});
