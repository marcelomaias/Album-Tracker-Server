const Joi = require('joi')
const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  artist: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  songs: [String]
})

const Album = mongoose.model('Album', albumSchema)

function validateAlbum(album) {
  const schema = {
    name: Joi.string().min(3).required(),
    artist: Joi.string().min(2).required()
  };

  return Joi.validate(album, schema)
}

exports.albumSchema = albumSchema
exports.Album = Album
exports.validate = validateAlbum