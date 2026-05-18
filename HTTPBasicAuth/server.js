const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const auth = require("./middlewares/auth.js");

const app = express();

app.use(express.json());

dotenv.config();
app.get("/", (req, res) => {
  res.status(200).json({ message: "Home" });
});

app.get("/protected", auth, (req, res) => {
  res.status(200).json({
    message: `Welcome dear ${req.user.username}`,
  });
});

app.get("/items", auth, (req, res) => {
  res.status(200).json({
    message: "Items for authenticated users...",
    items: [
      { id: 1, name: "Laptop" },
      { id: 2, name: "Phone" },
      { id: 3, name: "Headphones" },
      { id: 4, name: "Keyboard" },
    ],
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port: ${process.env.PORT}`);
});
