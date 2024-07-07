const bcrypt = require('bcrypt')
const User = require('../models/User')
const { generate } = require('../helpers/token')
const ROLES = require('../constants/roles')

// register

async function register(login, password) {
  if (!password) {
    throw new Error('Нужно ввести пароль!')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    login,
    password: hashedPassword,
  })

  const token = generate({ id: user.id })

  return { user, token }
}

// login

async function login(login, password) {
  const user = await User.findOne({ login })

  if (!user) {
    throw new Error('Пользователь не найден!')
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
    throw new Error('Неверный пароль!')
  }

  const token = generate({ id: user.id })

  return {
    user,
    token,
  }
}

// get all users

function getUsers() {
  return User.find()
}

// get all roles

function getRoles() {
  return [
    {
      id: ROLES.READER,
      name: 'Читатель',
    },
    {
      id: ROLES.MODERATOR,
      name: 'Модератор',
    },
    {
      id: ROLES.ADMIN,
      name: 'Админ',
    },
  ]
}

// delete user

function deleteUser(id) {
  return User.deleteOne({ _id: id })
}

// edit user role

function editUserRole(id, role) {
  return User.findByIdAndUpdate(id, role, { returnDocument: 'after' })
}

module.exports = {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  editUserRole,
}
