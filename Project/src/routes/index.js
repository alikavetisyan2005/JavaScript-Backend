const router = require("express").Router();
const authRoutes = require("./auth/auth.routes");
const productRoutes = require("./product/product.routes");
const categoryRoutes = require("./category/category.routes");
const cartRoutes = require("./cart/cart.routes");
const orderRoutes = require("./order/order.routes");
const reviewRoutes = require("./reviews/review.routes")


router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/carts", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/reviews", reviewRoutes)

module.exports = router