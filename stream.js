const fs = require("fs");
const path = require("path");
// in general , it is preferable to grab the data
// one by one and not do it all at once
// so we create read and write streams
const rs = fs.createReadStream(path.join(__dirname, "files", "starter.txt"), {
  encoding: "utf8",
});
const ws = fs.createWriteStream(path.join(__dirname, "files", "starter2.txt"));

// now we need to listen to the data to read from the file
// then save it to variable 'dataChunk' and write it to the
// new starter2 file using write stram
rs.on("data", (dataChunk) => {
  ws.write(dataChunk);
});

// other easier way to do the above it using 'pipe'
rs.pipe(ws); // Wow!
