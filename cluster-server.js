import { availableParallelism } from "node:os";
import process from "node:process";
import cluster from "node:cluster";

import http from "http";
const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const server = http.createServer((req, res) => {
    if (req.url == "/home") {
      let sum = 0;
      for (let index = 0; index < 100000; index++) {
        sum += index;
      }
      return res.end(`Hello from home page ${sum}`);
    }
  });

  server.listen(6000, () => {
    console.log("server is listening on port 6000");
  });
}
