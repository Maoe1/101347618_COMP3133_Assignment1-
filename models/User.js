const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: [
      (username) => username.length >= 4,
      'Username must have at least 4 characters'
    ]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,}$/,
      'Please enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;