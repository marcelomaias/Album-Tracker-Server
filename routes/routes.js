const express = require('express')
const albumRouter = require('./albums')
// const userRouter = require('./users')
// const authRouter = require('./routes/auth')

module.exports = function (app) {
  // app.use('/api/users', userRouter)
  // app.use('/api/auth', authRouter)
  app.use('/api/albums', albumRouter) // SET THE INDIVIDUAL ROUTES
}