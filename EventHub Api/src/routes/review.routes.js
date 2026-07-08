const router = require("express").Router();
const isAuth = require("../middlewares/auth.middleware")
const validate = require("../middlewares/validate.middleware");

const reviewController = require("../controllers/review.controller");
const reviewSchema = require("../validators/review.validator");

router.post(
    "/events/:eventId/reviews",
    isAuth,
    validate(reviewSchema),
    reviewController.createReview
);

router.get("/test", (req, res) => {
    res.json({
        message: "review routes loaded"
    });
});

router.get(
    "/events/:eventId/reviews",
    reviewController.getReviews
);


router.patch(
    "/reviews/:id",
    isAuth,
    reviewController.updateReviews
);


router.delete(
    "/reviews/:id",
    isAuth,
    reviewController.deleteReviews
);

module.exports = router