const net = require("node:net");

const clients = new Map();

const broadCast = (socket, message) =>{
    for(let [username, clientSocket] of clients){
        if(socket !== clientSocket){
            clientSocket.write(message);
        }
    }
}


const server = net.createServer((socket) =>{

    socket.write("Enter a username: ");

    let username = null;
    
    socket.on("data", (message) =>{
        const msg = message.toString().trim();

        if(!username){
            if(clients.has(msg)){
                socket.write("Username is already used, try another...")
                return;
            }
            username = msg;
            clients.set(username,socket)
    
            socket.write("Welcome");
            broadCast(username, `${username} joined chat...`);
    
            return;
        }

        broadCast(username, `${username}: ${msg}`);

    })

    socket.on("close", () =>{
        broadCast(socket, `${socket} left the chat...`)
    })

})

server.listen(3001, "localhost", () =>{
    console.log("The server run on server local host on port 3001")
})