const mongoose = require('../db/db');

const Schema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  contacts: [{
    contact_username: {
      type: String,
    },
    contact_telephone: {
      type: Number,
    }
  }]
}, { timestamps: true })

const Contact = mongoose.model('contacts', Schema)

module.exports = Contact