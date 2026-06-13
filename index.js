import http from "http";
import fs from "fs";
import EventEmitter from "events";

const emmiter = new EventEmitter();

const server = http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(req.url, "http://localhost:5000");
  if (pathname === "/home") {
    let sum = 0;
    for (let index = 0; index < 100000; index++) {
      sum+=index;
      
    }
    return res.end(`Hello from home page ${sum}`);
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

// events
const task1Handler = (data)=>{
  console.log("task1 completed ", data.username);
// throw new Error("something broke")
}
emmiter.on("task1", task1Handler);

setTimeout(() => {
  emmiter.emit("task1", { username: "ashok" });
}, 2000);

// emmiter.off("task1", task1Handler);
// emmiter.removeAllListeners('task1');
// emmiter.off('task1',task1Handler)


emmiter.on('error',(err)=>{
    console.error(err?.message)

})


class Database extends EventEmitter{
    connect(){
        this.emit("connected")
    }
}

const db = new Database();
db.on("connected",()=>{
    console.log('db connected ')
})
db.connect()
server.listen(5000, () => {
  console.log("Server running on port 5000");
});
