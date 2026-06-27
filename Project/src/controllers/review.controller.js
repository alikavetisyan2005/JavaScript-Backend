const reviewService = require("../services/review.service");

const deleteReview = async (req, res, next) => {
  try {
    await reviewService.deleteReview(
      Number(req.params.id),
      Number(req.user.userId),
      req.user.role
    );
    return res.status(200).json({ message: "Review successfully deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {deleteReview };