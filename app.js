require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const routes = require('./routes')
const cors = require('cors');

const port = 3001
const app = express()

app.use(cors({
  origin: ['frontend-blog-result-university.vercel.app', 'localhost:5173'],
  credentials: true
}));

app.use(express.static('../frontend/dist'))

app.use(cookieParser())
app.use(express.json())

app.use('/', routes)

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
})
