const mongoose = require('../db/db');

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, { timestamps: true })

const Announcement = mongoose.model('announcement', Schema)

module.exports = Announcement