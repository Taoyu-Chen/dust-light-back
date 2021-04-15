const mongoose = require('../db/db');

const Schema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  budget: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },// ['poster','ui']
  deadline: {
    type: String,
    required: true
  },
  bidNumber: {
    type: Number,
    default: 10
  },
  uploader: {
    type: Array,
    default: []
  },
  detail: {
    type: String,
    default: "This publisher has not posted any content."
  },
  status: {
    type: Number,
    default: 0
  },
  biddingList: [{
    bidder: {
      username: {
        type: String,
        require: true,
        unique: true,
      },
      telephone: {
        type: String,
        required: true
      },
    },
  }
  ],
  fdUsername: {
    type: String,
    default: "",
  },
  bpUsername: {
    type: String,
    default: "",
  },
  // Whether the order was cancelled
  isCanceled: {
    type: Boolean,
    default: false 
  }
}, { timestamps: true })

const Task = mongoose.model('tasks', Schema)

module.exports = Task