const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/submit', authMiddleware, reviewController.submitReview);
router.get('/:userId', reviewController.getReviews);

module.exports = router;
