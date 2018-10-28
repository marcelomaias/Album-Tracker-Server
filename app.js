const express = require('express')
const Joi = require('joi')

const app = express()
app.use(express.json())
// require('./routes/routes')(app)

const albums = [
  { id: 1, name: 'Album1' },
  { id: 2, name: 'Album2' },
  { id: 3, name: 'Album3' }
]

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.get('/api/albums', async (req, res) => {
  res.send(albums) 
})

app.post('/api/albums', async (req, res) => {
  const { error } = validateAlbum(req.body)// OBJ DESTRUCTURING, SAME AS RESULT.ERROR
  if (error) return res.status(400).send(error.details[0].message)

  const album = {
    id: albums.length + 1,
    name: req.body.name
  }
  albums.push(album)
  res.send(album)
})

app.get('/api/albums/:id', async (req, res) => {
  const album = albums.find(a => a.id === parseInt(req.params.id))
  if (!album) return res.status(404).send('Album not found.')
  res.send(album)
})

app.put('/api/albums/:id', async (req, res) => {
  const album = albums.find(a => a.id === parseInt(req.params.id))
  if (!album) return res.status(404).send('Album not found.')

  const { error } = validateAlbum(req.body) // OBJ DESTRUCTURING, SAME AS RESULT.ERROR
  if (error) return res.status(400).send(error.details[0].message)
  
  album.name = req.body.name
  
  res.send(album)
})

app.delete('/api/albums/:id', async (req, res) => {
  const album = albums.find(a => a.id === parseInt(req.params.id))
  if (!album) return res.status(404).send('Album not found.')

  const index = albums.indexOf(album)
  albums.splice(index, 1)
  res.send(album)
})

function validateAlbum (album) {
  const schema = {
    name: Joi.string().min(3).max(50).required()
  }
  return Joi.validate(album, schema)
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))