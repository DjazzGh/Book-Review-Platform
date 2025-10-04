
const Review = require('../models/Review');
const Book = require('../models/Book');
const mongoose = require('mongoose'); // Ensure mongoose is imported

const addReview = async (req, res) => {
  console.log('addReview called with:', req.body);
  const { bookId, rating, reviewText } = req.body;
  try {
    if (!mongoose.isValidObjectId(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    const review = new Review({ bookId, userId: req.user.id, rating, reviewText });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error('Error in addReview:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const getReviews = async (req, res) => {
  console.log('getReviews called for bookId:', req.params.bookId);
  try {
    if (!mongoose.isValidObjectId(req.params.bookId)) {
      console.log('Invalid bookId:', req.params.bookId);
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    const bookId = new mongoose.Types.ObjectId(req.params.bookId); // Create ObjectId
    const reviews = await Review.find({ bookId }).populate('userId', 'name');
    console.log('Reviews fetched:', reviews);
    const averageRating = await Review.aggregate([
      { $match: { bookId } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } },
    ]);
    console.log('Average rating:', averageRating);
    res.json({ reviews, averageRating: averageRating[0]?.avgRating || 0 });
  } catch (error) {
    console.error('Error in getReviews:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  console.log('updateReview called for reviewId:', req.params.id);
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (error) {
    console.error('Error in updateReview:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  console.log('deleteReview called for reviewId:', req.params.id);
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await review.deleteOne(); // Use deleteOne instead of remove
    res.json({ message: 'Review deleted' });
  } catch (error) {
    console.error('Error in deleteReview:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addReview, getReviews, updateReview, deleteReview };
