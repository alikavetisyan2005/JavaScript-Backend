const router = require("express").Router();
const cartController = require("../../controllers/cart.controller");
const authMiddleware = require("../../middleware/auth/auth.middleware");

router.get("/", authMiddleware, cartController.getCart);
router.post("/items", authMiddleware, cartController.addItem);
router.put("/items/:id", authMiddleware, cartController.updateItem);
router.delete("/items/:id", authMiddleware, cartController.deleteItem);

module.exports = router;