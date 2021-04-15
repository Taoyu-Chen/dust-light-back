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
  email: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  personalSignature: {
    type: String,
    default: "This person is very lazy and doesn't write anything"
  },
  money: {
    type: Number,
    default: 0
  },
  isBan: {
    type: Boolean,
    default: false
  }
  //
  // contactList: [
  //   // Contact list
  //   {
  //     contact: {
  //       username: {
  //         type: String,
  //         require: true,
  //       },
  //       contactTelephone: {
  //         type: String,
  //         required: true,
  //       },
  //       contactName: {
  //         type: String,
  //         required: true,
  //       }
  //     }
  //   }
  // ]
  
}, { timestamps: true })

const User = mongoose.model('user', Schema)

module.exports = User