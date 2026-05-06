const http = require("node:http");

const books = [
    {id: 1, title: "The definitive Guide", author: "David Flanagan"},
    {id: 2, title: "You dont know js", author: "Kyle Sympson"},
];



const server = http.createServer((req,res) => {
    res.setHeader("Content-type", "application/json");
    
    if(req.method === "GET" && req.url === "/books"){
        res.writeHead(200);
        return res.end(JSON.stringify(books));
    }

    if(req.method === "GET" && req.url.startsWith("/books/")){
        const id = Number(req.url.split("/")[2]);
        const book = books.find(b => b.id === id);
        if(!book){
            res.writeHead(404);
            return res.end(JSON.stringify({message: "Book is not found"}))
        }
        res.writeHead(200);
        return res.end(JSON.stringify(book));
    }

    if(req.method === "POST" && req.url === "/books"){
        let body = "";
        req.on("data", (chunk) => body += chunk);

        req.on("end", () => {
            try{
                const book = JSON.parse(body);
                if(!book.author || !book.title){
                    res.writeHead(400);
                    return res.end(JSON.stringify({message: "Missing fields"}));
                }
                const newID = books.length + 1;
                book.id = newID;
                books.push(book);

                res.writeHead(201);
                res.end(JSON.stringify(book))
            }
            catch{
                res.writeHead(400);
                res.end(JSON.stringify({message: "Invalid JSON"}))
            }
        })
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify("Route was not found"))
})


server.listen(3001, () => {
    console.log("Server running on port 3001")
}
)