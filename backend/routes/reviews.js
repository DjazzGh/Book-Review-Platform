const express = require('express');
const { addReview, getReviews, updateReview, deleteReview } = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, addReview);
router.get('/book/:bookId', getReviews);
router.put('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);

module.exports = router;