// require the logEvents we did
const logEvents = require("./logEvents");

// EventEmitter clas
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

// initialize object
const myEmitter = new MyEmitter();

// add listener for the log event
// and send the 'msg' as parameter to the logEvents
myEmitter.on("log", (msg) => logEvents(msg));

// timeout of 2s if the log failed
setTimeout(() => {
  // Emit event
  myEmitter.emit("log", "Log event Emitted! \n");
}, 2000);
