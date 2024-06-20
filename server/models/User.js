const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  username: String,
  name: String,
  education: String,
  professional_experience: String,
  certificates: String,
  skills: String,
});

module.exports = mongoose.model('User', userSchema);
