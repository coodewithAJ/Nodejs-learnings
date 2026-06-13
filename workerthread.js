import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} from "node:worker_threads";
let sum = 0;
for (let index = 0; index < 1000000000000; index++) {
  sum += index;
}
parentPort.postMessage(sum);
