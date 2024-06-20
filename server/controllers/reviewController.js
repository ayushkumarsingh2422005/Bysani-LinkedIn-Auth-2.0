const Rating = require('../models/Rating');

exports.submitReview = async (req, res) => {
  const { userId, rating, review } = req.body;
  try {
    const newRating = new Rating({
      rating_id: new mongoose.Types.ObjectId(),
      user_id: userId,
      rated_by_user_id: req.user.id,
      rating,
      review,
    });
    await newRating.save();
    res.json(newRating);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Rating.find({ user_id: req.params.userId }).populate('rated_by_user_id');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
