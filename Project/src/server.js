const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth/auth.routes");
const productRoutes = require("./routes/product/product.routes");
const categoryRoutes = require("./routes/category/category.routes");
const cartRoutes = require("./routes/cart/cart.routes");
const orderRoutes = require("./routes/order/order.routes");
const reviewRoutes = require("./routes/reviews/review.routes")

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/carts", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes)

app.get("/", (req, res) => {
  return res.json({ message: "Api is running" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is runnig on Port ${process.env.PORT}`);
});
