const http = require("node:http");

const books = [
    {id: 1, title: "The definitive Guide", author: "David Flanagan"},
    {id: 2, title: "You dont know js", author: "Kyle Sympson"},
];

let nextId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1



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

                book.id = nextId++;
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

    if(req.method === "PUT" && req.url.startsWith("/books/")){
        const id = Number(req.url.split("/")[2])

        if(isNaN(id)){
            res.writeHead(400);
            return res.end(JSON.stringify({message: "Id is invalid"}))
        }

        const bookIndex = books.findIndex(book => book.id === id);

        if(bookIndex === -1){
            res.writeHead(400);
            return res.end(JSON.stringify({message: "Book not found"}))
        }

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        })
        req.on("end", () => {
            try{
                const updatedBook = JSON.parse(body);

                if(!updatedBook.title || !updatedBook.author){
                    res.writeHead(400);
                    return res.end(JSON.stringify({message: "fields should be filled with valid values"}))
                }

                books[bookIndex] = {
                    id,
                    title: updatedBook.title,
                    author: updatedBook.author,
                }

                res.writeHead(200);
                return res.end(JSON.stringify({message: "Book is updated"}))
            }
            catch{
                res.writeHead(400);
                return res.end(JSON.stringify({message: "invalid JSON"}))
            }
        })
        return;
    }

    if(req.method === "PATCH" && req.url.startsWith("/books/")){
        const id = Number(req.url.split("/")[2]);

        if(isNaN(id)){
            res.writeHead(404);
            return res.end(JSON.stringify({message: "id is invalid"}));
        }

        const bookIndex = books.findIndex(book => book.id === id);

        if(bookIndex === -1){
            res.writeHead(400);
            return res.end(JSON.stringify({message: "Book with this id does not exist"}));
        }

        let body = "";

        req.on("data", (chunk) => body += chunk);

        req.on("end", () => {
            try{
                const update = JSON.parse(body);
                
                if(!update) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({message: "Fields must be filled"}))
                }
                books[bookIndex] = {
                    ...books[bookIndex],
                    ...update
                }

                res.writeHead(200);
                return res.end(JSON.stringify("Field is updated"))
            }
            catch{
                res.writeHead(400);
                return res.end(JSON.stringify({message: "Invalid JSON"}))
            }
        })


        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({message: "Route was not found"}))
})


server.listen(3001, () => {
    console.log("Server running on port 3001")
}
)