const express = require('express')
const router = express.Router()
const { Album, validate } = require('../models/albumModel')
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
  const albums = await Album.find()
  res.send(albums)
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)// OBJ DESTRUCTURING, SAME AS RESULT.ERROR
  if (error) return res.status(400).send(error.details[0].message)

  let album = new Album({
    name: req.body.name,
    artist: req.body.artist,
    imgUrl: req.body.imgUrl,
    description: req.body.description,
    songs: req.body.songs
  })
  album = await album.save()
  
  res.send(album)
})

router.get('/:id', async (req, res) => {
  const album = await Album.findById(req.params.id)

  if (!album) return res.status(404).send('Album not found.')
  res.send(album)
})

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body) // OBJ DESTRUCTURING, SAME AS RESULT.ERROR
  if (error) return res.status(400).send(error.details[0].message)

  const album = await Album.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    artist: req.body.artist,
    imgUrl: req.body.imgUrl,
    description: req.body.description,
    songs: req.body.songs
  }, { new: true })

  if (!album) return res.status(404).send('Album not found.')
  
  res.send(album)
})

router.delete('/:id', auth, async (req, res) => {
  const album = await Album.findByIdAndRemove(req.params.id)

  if (!album) return res.status(404).send('Album not found.')

  res.send(album)
})

module.exports = router