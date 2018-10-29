const albumRouter = require('./albums')
const userRouter = require('./users')
const authRouter = require('./auth')

module.exports = function (app) {
  app.use('/api/users', userRouter) // SET THE INDIVIDUAL ROUTES
  app.use('/api/login', authRouter)
  app.use('/api/albums', albumRouter)
}