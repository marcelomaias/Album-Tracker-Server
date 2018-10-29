const Joi = require('joi')
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1000
  }
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ 
    _id: this._id, // SEND ID TO THE TOKEN
    isAdmin: this.isAdmin // SEND ISADMIN TO THE TOKEN
  }, config.get('jwtKey'))
  return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
  const schema = {
    name: Joi.string().min(2).required(),
    email: Joi.string().min(2).email().required(),
    password: Joi.string()
  };

  return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser