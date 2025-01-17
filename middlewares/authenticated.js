const User = require('../models/User')
const { verify } = require('../helpers/token')

module.exports = async function (req, res, next) {
  try {
    const tokenData = verify(req.cookies.token)
    
    const user = await User.findOne({ _id: tokenData.id })

    if (!user) {
      res.send({ error: 'Авторизованного пользователя нет!' })

      return
    }

    req.user = user

    next()
  } catch (err) {
    res.send({ error: err.message })
  }
}
