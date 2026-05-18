const express = require("express");
const dotenv = require("dotenv")

dotenv.config();
const users = [
  { id: process.env.ALBERT, name: "Albert", permissions: ["read", "write"] },
  { id: process.env.SARGIS, name: "Sargis", permissions: ["read"] },
  { id: process.env.TIGRAN, name: "Tigran", permissions: ["write"] },
];

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
];

const app = express();

app.use(express.json());

function auth(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const user = users.find((user) => user.id === apiKey);

  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  req.user = user;

  next();
}

function authPermisions(permission) {
    return (req, res , next) => {
        // console.log(req.user)
        const userPerm = req.user.permissions;

        if(!userPerm.includes(permission)){
            return res.status(403).json({message: "You dont have permission"})
        }

        next();
    }
}

app.get("/status", (req, res) => {
    res.status(200).json({message: "Server is running..."})
})
app.get("/products", auth, authPermisions("read"), (req, res) => {
    res.json(products);
});

app.post("/products", auth, authPermisions("write"), (req, res) => {
    const product = req.body;

    if(!product.name || !product.price){
        return res.status(400).json({message: "Products name and price are required fields"});
    }
    const newProduct = {
        id: Date.now(),
        name: product.name,
        price: product.price,
    }

    products.push(newProduct);

    res.status(201).json({message: "Successfully created"});
})



app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
})