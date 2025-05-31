const Review = require("../models/Review");
const Hostel = require("../models/Hostel"); // assuming you store averageRating & totalReviews here

// Helper to recalculate rating stats for a hostel
const updateHostelRating = async (hostelId) => {
  const stats = await Review.aggregate([
    { $match: { hostelId, isVisible: true } },
    {
      $group: {
        _id: "$hostelId",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  const { averageRating = 0, totalReviews = 0 } = stats[0] || {};

  await Hostel.findOneAndUpdate(
    { userId: hostelId },
    { averageRating, totalReviews },
    { new: true }
  );
};

// Create a review (unique per hostel/user)
exports.createReview = async (req, res) => {
  try {
    const { hostelId, userId, review, rating } = req.body;

    const newReview = await Review.create({ hostelId, userId, review, rating });

    await updateHostelRating(hostelId);

    res.status(201).json({ success: true, data: newReview });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "You have already reviewed this hostel." });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all reviews for a specific hostel
exports.getReviewsByHostel = async (req, res) => {
  try {
    const { hostelId } = req.params;

    const reviews = await Review.find({ hostelId, isVisible: true }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single review by user and hostel
exports.getUserReview = async (req, res) => {
  try {
    const { hostelId, userId } = req.params;

    const review = await Review.findOne({ hostelId, userId });

    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a review (by user)
exports.updateReview = async (req, res) => {
  try {
    const { hostelId, userId } = req.params;
    const updateData = req.body;

    const review = await Review.findOneAndUpdate(
      { hostelId, userId },
      updateData,
      { new: true }
    );

    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    await updateHostelRating(hostelId);

    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a review (by user or admin)
exports.deleteReview = async (req, res) => {
  try {
    const { hostelId, userId } = req.params;

    const review = await Review.findOneAndDelete({ hostelId, userId });

    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    await updateHostelRating(hostelId);

    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Toggle visibility (admin/moderator)
exports.toggleReviewVisibility = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    review.isVisible = !review.isVisible;
    await review.save();

    await updateHostelRating(review.hostelId);

    res.status(200).json({ success: true, message: `Visibility toggled to ${review.isVisible}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Owner responds to a review
exports.ownerRespond = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { response } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { ownerResponse: response },
      { new: true }
    );

    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
