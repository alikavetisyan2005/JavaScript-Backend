const router = require("express").Router();
const productController = require("../../controllers/product.controller");
const authMiddleware = require("../../middleware/auth/auth.middleware");
const isAdmin = require("../../middleware/auth/admin.middleware");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.get("/:id/reviews", productController.getReviews);
router.post("/:id/reviews", authMiddleware, productController.createReview);
router.post("/", authMiddleware, isAdmin, productController.createProduct);
router.put("/:id", authMiddleware, isAdmin, productController.updateProduct);
router.delete("/:id", authMiddleware, isAdmin, productController.deleteProduct);

module.exports = router;