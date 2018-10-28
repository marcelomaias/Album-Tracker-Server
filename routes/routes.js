const express = require('express')
const userRouter = require('./users')
// const authRouter = require('./routes/auth')

module.exports = function (app) {
  app.use('/api/users', userRouter)
  // app.use('/api/auth', authRouter)
  app.use('/api/movies', movieRouter)
}