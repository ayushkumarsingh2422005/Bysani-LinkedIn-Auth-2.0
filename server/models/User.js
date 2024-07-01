const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  education: String,
  professional_experience: String,
  certificates: String,
  skills: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;
