const mongoose = require('../db/db');

const Schema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  contactTelephone: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  }
}, { timestamps: true })

const User = mongoose.model('contacts', Schema)

module.exports = User