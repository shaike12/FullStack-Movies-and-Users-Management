const moviesBL = require('../models/moviesBL')
const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    let movies = await moviesBL.getMovies()
    
    res.json(movies)
})

router.get('/:id', async (req, res) => {
    let movie = await moviesBL.getMovieByID(req.params.id)
    
    res.json(movie)
})

router.post('/', async (req, res) => {
    let movie = await moviesBL.addMovie(req.body)
    
    res.json(movie)
})

router.put('/:id', async (req, res) => {
    let movie = await moviesBL.updateMovie(req.params.id, req.body)
    
    res.json(movie)
})

router.delete('/:id', async (req, res) => {
    let movie = await moviesBL.deleteMovie(req.params.id)
    
    res.json(movie)
})


module.exports = router