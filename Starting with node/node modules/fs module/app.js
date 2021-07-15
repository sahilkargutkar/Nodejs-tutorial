const fs = require("fs");

// const file = fs.readdirSync("./"); This is synchronous method
//console.log(file);

fs.readdir("./", function (err, files) {
  if (err) console.log("error", err);
  else console.log("file", files);
});
