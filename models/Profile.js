const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  airport: {
    type: String
  },
  date: {
    type: String,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
