import { parentPort, workerData } from "node:worker_threads";

const { thread_count, thread_id } = workerData;

const chunkSize = 10000000000 / thread_count;
const start = chunkSize * thread_id;
const end = start + chunkSize;

let sum = 0;
for (let index = start; index < end; index++) {
  sum += index;
}

parentPort.postMessage(sum);
