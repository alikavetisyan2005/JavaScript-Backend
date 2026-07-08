const reviewService = require("../services/review.service");
const asyncHandler = require("../utils/asyncHandler");


const createReview = asyncHandler(async(req, res) => {
    const review = await reviewService.createReview(req.params.eventId, req.user.id, req.body);
    return res.status(201).json({review});
})

const getReviews = asyncHandler(async(req, res) => {
    const reviews = await reviewService.getReviews(req.params.eventId);
    return res.status(200).json({reviews})
})

const updateReviews = asyncHandler(async(req, res) => {
    const updated = await reviewService.updateReview(req.params.id, req.user.id, req.body);
    return res.status(200).json({updated});
})

const deleteReviews = asyncHandler(async(req, res) => {
    const deleted = await reviewService.deleteReview(req.params.id, req.user.id);

    return res.status(200).json({deleted});
})

module.exports = {
    createReview,
    getReviews,
    updateReviews,
    deleteReviews
}