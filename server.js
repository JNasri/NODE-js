<<<<<<< HEAD
/* THE EMITTER PART*/
// require the logEvents we did
const logEvents = require("./logEvents");
// EventEmitter clas
const EventEmitter = require("events");
const { request } = require("http");
class MyEmitter extends EventEmitter {}
// initialize object
const myEmitter = new MyEmitter();

// add listener for the log events
// with message and filename for each myEmitter.emit(...) call
myEmitter.on("log", (msg, filename) => logEvents(msg, filename));

//
//

/* THE SERVER PART*/
const http = require("http");
const path = require("path");
const fs = require("fs");
const fsP = require("fs").promises;

// fisrt we need to define a port for our web server,
// the port we are using for Node/Nodemon is for dev
const PORT = process.env.PORT || 3500;

//Note: this function is for the server, needed later
// need filepath, contentType and response object (res)
const serveFile = async (filePath, contentType, response) => {
  try {
    // get the file
    const rawData = await fsP.readFile(
      filePath,
      // check if data is image so no need for utf8
      !contentType.includes("image") ? "utf8" : ""
    );

    // if its json, go ahead and parse it
    const data =
      contentType === "application/json" // if json
        ? JSON.parse(rawData) // parse
        : rawData; // else leave it alone

    //now , check if this func was called by 200 or 404
    // then writeHead that statusCode
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      contectType: contentType,
    });

    // send the file
    response.end(
      // again, check if json to make it string
      contentType === "application/json" // if json
        ? JSON.stringify(data) // stringify
        : data // else leave it alone
    );
  } catch (error) {
    // FOR TESTING
    console.log(error);
    //emit the error request
    myEmitter.emit("log", `${error.name} : ${error.message} \n`, "errLog.txt");
    response.statusCode = 500; // 500 = server error
    response.end();
  }
};

// now we create a server using the http module
// the function will get a req and res (request, response)
// req: what user requests -- res: respond form server
const server = http.createServer((req, res) => {
  // FOR TESTING
  // console.log(req.url, req.method);

  //emit the request with the url and method to a file
  myEmitter.emit("log", `${req.url}\t${req.method} \n`, "reqLog.txt");

  // (1) we need to know the req in order to give the propre res
  //
  //

  // first, check for the file extension (html,css,png...)
  const extension = path.extname(req.url);
  // variable for the contentType header
  let contentType;
  // check the type and give content type
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      // .html
      contentType = "text/html";
      break;
  }
  // now after we found the contentType, we find the specific path
  let filePath =
    contentType === "text/html" && req.url === "/" // if type html and req is just /
      ? path.join(__dirname, "views", "index.html") // res = index.html
      : contentType === "text/html" && req.url.slice(-1) === "/" // if it's subdir
      ? path.join(__dirname, "views", req.url, "index.html") // res = /subdir/index.ht
      : contentType === "text/html" // if req is other html file
      ? path.join(__dirname, "views", req.url) // res = path to that file
      : path.join(__dirname, req.url); //(LAST ELSE) if any other contentType is req
  // here , if the request has no extention at all, we add it
  // this makes html extension not required in the browser
  if (!extension && req.url.slice(-1) != "/") {
    filePath += ".html";
  }

  // (1) we need to know the req in order to give the propre res
  // (2) we have content type and filePath, we are ready to response
  //

  // we check if what required actually exists
  const fileExists = fs.existsSync(filePath); // returns T or F
  if (fileExists) {
    // serve the file
    serveFile(filePath, contentType, res);
  } else {
    // maybe 301 : redirect (if page requested in old....etc)
    // maybe 404 : page/file not found

    // we only need the base from the filepath (xxx.html)
    switch (path.parse(filePath).base) {
      case "old-page.html":
        // if req is an old page, redirect to new page
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        // if req is old index page, redirect to new page
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        // if page is not found, serve a 404 res
        // notice here the file path has 404.html in
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

// server needs to listen for a request to be given
// when a request happen at the PORT number, it will run http.createServer
// which is the function written above
// note: this should be always at the end of server.js file
server.listen(PORT, () => console.log(`server running on port : ${PORT}`));
=======
console.log("Hello World");
// console.log(global);
const os = require("os");
const path = require("path");
const math = require("./math");

console.log(math.add(3, 3));

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());
// console.log(__dirname);
// console.log(__filename);

// console.log(path.parse(__filename));
>>>>>>> parent of a06b035 (npm in Node)
