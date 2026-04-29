const net = require("node:net");

const client = net.createConnection({port: 3001, host: "localhost"}, () =>{
    console.log("The client connected to the server");
})




client.on("data", (message) =>{
    console.log(message.toString());
})
client.on("end", () =>{
    process.exit(0);
})


process.stdin.on("data", (message) =>{
    if(message.toString().trim() === "exit"){
        client.end();
        return;
    }

    client.write(message.toString())
})

