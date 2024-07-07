const mongoose = require('mongoose')
const validator = require('validator')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'Картинка должна быть ссылкой!'
    }
  },
  content: {
    type: String,
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }]
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

module.exports = Post