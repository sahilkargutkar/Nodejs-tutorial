const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello world");
    res.end();
  }
});

// server.on("connection", (e) => {
//   console.log("new connection");
// });

server.listen(3000);

console.log("Listening to port 3000...");
