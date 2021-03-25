const mongoose = require('../db/db');

const Schema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
}, { timestamps: true })

const User = mongoose.model('user', Schema)

module.exports = User