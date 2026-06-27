const router = require("express").Router();
const orderController = require("../../controllers/order.controller");
const authMiddleware = require("../../middleware/auth/auth.middleware");
const isAdmin = require("../../middleware/auth/admin.middleware");

router.post("/checkout", authMiddleware, orderController.checkout);
router.get("/", authMiddleware, orderController.getOrders);
router.get("/:id", authMiddleware, orderController.getOrderById);
router.patch("/:id/status", authMiddleware, isAdmin, orderController.updateStatus);

module.exports = router;