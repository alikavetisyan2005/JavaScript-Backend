const Event = require("../models/Event");
const Review = require("../models/Review");

const AppError = require("../utils/AppError");

async function createReview(eventId, userId, data) {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError(404, "Event not found");
  }

  const attended = event.attendees.some((attendee) => attendee.equals(userId));

  if (!attended) {
    throw new AppError(403, "You can only review events you attendeed");
  }

  const review = await Review.create({
    ...data,
    event: eventId,
    user: userId,
  });

  return review;
}

async function getReviews(eventId) {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError(404, "Event not found");
  }

  const reviews = await Review.find({ event: eventId });

  return reviews;
}

async function updateReview(reviewId, userId, data) {
  const review = await Review.findById(reviewId);
  if (!review) throw new AppError(404, "Review not found");

  const updated = await Review.findByIdAndUpdate(reviewId, data, {
    new: true,
    runValidators: true,
  });

  return updated;
}

async function deleteReview(reviewId, userId) {
  const review = await Review.findById(reviewId);

  if (!review) throw new AppError(404, "Review not found");

  const deleted = await Review.findByIdAndDelete(reviewId);

  return deleted;
}


module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview
}