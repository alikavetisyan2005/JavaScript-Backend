const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const userRouter = require("./routes/users.routes.js");
const productRouter = require("./routes/products.routes.js");
const cartRouter = require("./routes/carts.routes.js");
const orderRouter = require("./routes/orders.routes.js");


const app = express();

app.use(express.json());

dotenv.config();

app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts",cartRouter )
app.use("/api/orders", orderRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port: ${process.env.PORT}`);
});
