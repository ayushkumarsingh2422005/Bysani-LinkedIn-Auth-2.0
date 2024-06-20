const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  rating_id: { type: String, required: true, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rated_by_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
});

module.exports = mongoose.model('Rating', ratingSchema);
