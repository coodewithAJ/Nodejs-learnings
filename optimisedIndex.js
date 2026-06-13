import http from "http";
import fs from "fs";
import EventEmitter from "events";
import { Worker } from "node:worker_threads";

const emmiter = new EventEmitter();
const THREAD_COUNT = 4;

function createWorker(thread_id) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./optimisedWokerThread.js", {
      workerData: {
        thread_count: THREAD_COUNT,
        thread_id,
      },
    });

    worker.on("message", (data) => resolve(data));
    worker.on("error", (error) => reject(error.message));
  });
}

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost:5000");

  if (pathname === "/home") {
    return res.end("Hello from home page");
  }

  if (pathname === "/blocking") {
    const allThreadPromises = [];
    for (let index = 0; index < THREAD_COUNT; index++) {
      allThreadPromises.push(createWorker(index)); // ✅ pass thread_id
    }
    try {
      const allThreadResult = await Promise.all(allThreadPromises);
      const allWorkerResult = allThreadResult.reduce(
        (acc, val) => acc + val,
        0,
      ); // ✅ sum numbers
      return res.end(`sum is ${allWorkerResult}`);
    } catch (err) {
      return res.end(`something went wrong ${err}`);
    }
  }
});

server.listen(5000, () => console.log("Server running on port 5000"));
