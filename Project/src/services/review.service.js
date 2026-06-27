const prisma = require("../db");
const AppError = require("../../utils/AppError");


const deleteReview = async (reviewId, userId, userRole) => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });

  if (!review) throw new AppError(404, "Review not found");

  if (userRole !== "ADMIN" && review.userId !== userId) {
    throw new AppError(403, "Review can be deleted only by its owner or admin");
  }

  return await prisma.review.delete({ where: { id: reviewId } });
};

module.exports = {deleteReview };