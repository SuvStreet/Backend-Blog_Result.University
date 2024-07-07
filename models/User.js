const mongoose = require('mongoose')
const roles = require('../constants/roles')

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: roles.READER,
  },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User