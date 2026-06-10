import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(req.url, "http://localhost:5000");
  if (pathname === "/home") {
    return res.end("Hello from home page");
  }
});

// asynchronously
fs.writeFile("./test.txt", "this is my test file data", (err) => {
  console.log(err, "error ");
});
fs.readFile("./test.txt", (err, data) => {
  console.log(data);
});

// sync
fs.readFileSync("./test.txt");

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
