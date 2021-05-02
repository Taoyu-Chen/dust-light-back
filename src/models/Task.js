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
    bidder_username: {
      type: String,
    }
  }],
  fdUsername: {
    type: String,
    default: "",
  },
  bpUsername: {
    type: String,
    default: "",
    required: true
  },
  // Whether the order was cancelled
  isCanceled: {
    type: Boolean,
    default: false 
  },
  // Designer's work
  work: {
    uploader_file: {
      type: String,
      default: "",
    },
    uploader_description: {
      type: String,
      default: "",
    }
  }
}, { timestamps: true })

const Task = mongoose.model('tasks', Schema)

module.exports = Task