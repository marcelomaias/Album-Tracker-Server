const express = require('express')
const router = express.Router()
const {Album, validate} = require('../models/album')

router.get('/', async (req, res) => {
  const albums = await Album.find()
  res.send(albums)
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)// OBJ DESTRUCTURING, SAME AS RESULT.ERROR
  if (error) return res.status(400).send(error.details[0].message)

  let album = new Album({
    name: req.body.name,
    artist: req.body.artist
  })
  album = await album.save()
  
  res.send(album)
})

router.get('/:id', async (req, res) => {
  const album = await Album.findById(req.params.id)

  if (!album) return res.status(404).send('Album not found.')
  res.send(album)
})

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body) // OBJ DESTRUCTURING, SAME AS RESULT.ERROR
  if (error) return res.status(400).send(error.details[0].message)

  const album = await Album.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    artist: req.body.artist
  }, { new: true })

  if (!album) return res.status(404).send('Album not found.')
  
  res.send(album)
})

router.delete('/:id', async (req, res) => {
  const album = await Album.findByIdAndRemove(req.params.id)

  if (!album) return res.status(404).send('Album not found.')

  res.send(album)
})

module.exports = router