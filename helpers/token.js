require('dotenv').config()

const jwt = require('jsonwebtoken')

module.exports = {
  generate(data) {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' })
  },

  verify(token) {
    if (!token) {
      throw new Error('Требуется авторизация')
    }

    try {
      return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const decoded = jwt.decode(token)
        const newToken = module.exports.generate({ id: decoded.id })

        return jwt.verify(newToken, process.env.JWT_SECRET)
      } else {
        throw new Error('Ошибка верификации токена')
      }
    }
  },
}
