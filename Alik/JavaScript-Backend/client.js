const net = require("node:net");

const client = net.createConnection(
  { port: 3000, host: "localhost" },
  () => {
    console.log("Connected to server");
  }
);

client.on("data", (data) => {
  console.log(data.toString());
});

client.on("end", () => {
  console.log("Disconnected from server");
});
process.stdin.on("data", (input) => {
  client.write(input);
});