const Joi = require('joi')
const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  artist: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  description: {
    type: String
  },
  imgUrl: {
    type: String,
  },
  songs: {
    type: Array,
  }
})

const Album = mongoose.model('Album', albumSchema)

function validateAlbum(album) {
  const schema = {
    name: Joi.string().min(2).required(),
    artist: Joi.string().min(2).required(),
    imgUrl: Joi.string(),
    description: Joi.string(),
    songs: Joi.array()
  };

  return Joi.validate(album, schema)
}

// exports.albumSchema = albumSchema
exports.Album = Album
exports.validate = validateAlbum