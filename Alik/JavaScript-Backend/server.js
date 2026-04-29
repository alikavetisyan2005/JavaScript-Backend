const net = require("node:net");
const fs = reqiure("node:fs")
const clients = new Set();

const broadCast = (message, socket) => {
    for (let client of clients) {
        if (client !== socket) {
            client.write(message);
        }
    }
};

const PORT = 3000;

const server = net.createServer((socket) => {
    console.log("Client connected");

    if (clients.size >= 5) {
        socket.write("Server full")
        socket.end();
        return;
    }

    clients.add(socket);

    socket.on("data", (message) => {
        broadCast(message, socket);
    });

    socket.on("end", () => {
        clients.delete(socket);
        console.log("Client disconnected");
    });

    socket.on("error", () => {
        clients.delete(socket);
    });
});

server.listen(PORT, "localhost", () => {
    console.log("Server running on port 3000");
});