const router = require("express").Router();
const reviewController = require("../../controllers/review.controller");
const authMiddleware = require("../../middleware/auth/auth.middleware");

router.delete("/:id", authMiddleware, reviewController.deleteReview);

module.exports = router;