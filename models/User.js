// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'superuser', 'user'],
    default: 'user',
  },
});

module.exports = mongoose.model('User', UserSchema);
