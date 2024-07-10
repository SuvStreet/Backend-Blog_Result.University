const express = require('express')
const { register, login } = require('../controllers/user')
const mapUser = require('../helpers/mapUser')

const router = express.Router({ mergeParams: true })

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password)

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      })
      .send({ error: null, user: mapUser(user) })
  } catch (err) {
    if (err.code === 11000) {
      res.send({ error: 'Такой пользователь уже существует!' })

      return
    }
    res.send({ error: err.message || 'Неизвестная ошибка...' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password)

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      })
      .send({ error: null, user: mapUser(user) })
  } catch (err) {
    res.send({ error: err.message || 'Неизвестная ошибка...' })
  }
})

router.post('/logout', (req, res) => {
  res.clearCookie('token').send({})
})

module.exports = router
