let express = require('express');
let router = express.Router();
let moviesBL = require('../Models/moviesBL')



router.get('/', async function(req, res){

    let movies = await moviesBL.getAllMovies()
    res.json(movies)
})

router.get('/:id', async function(req, res){

    let movie = await moviesBL.getMovieByID(req.params.id)
    res.json(movie)
})

router.post('/', async function(req, res){

    let movie = await moviesBL.addMovie(req.body)
    res.json(movie)
})

router.put('/:id', async function(req, res){

    let movieOld = await moviesBL.updateMovie(req.params.id, req.body)
    res.json(movieOld)
})

router.delete('/:id', async function(req, res){

    let movie = await moviesBL.deleteMovie(req.params.id)
    res.json(movie)
})

module.exports = router;


