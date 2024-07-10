const mongoose = require('mongoose')
const mapComment = require('./mapComment')

module.exports = function (post) {
  return {
    id: post._id,
    title: post.title,
    imgUrl: post.img_url,
    content: post.content,
    comments: post.comments.map((comment) =>
      mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
    ),
    publishedAt: post.createdAt.toLocaleString('ru-RU'),
  }
}
