const router = require("express").Router();
const categoryController = require("../../controllers/category.controller");
const authMiddleware = require("../../middleware/auth/auth.middleware");
const isAdmin = require("../../middleware/auth/admin.middleware");

router.get("/", categoryController.getCategories);
router.post("/", authMiddleware, isAdmin, categoryController.createCategory);
router.delete("/:id", authMiddleware, isAdmin, categoryController.deleteCategory);

module.exports = router;