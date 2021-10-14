let moviesDAL = require("../Dals/moviesDAL");
let moviesModel = require("../models/moviesModel");

const getAllMovies = async () => {
  return new Promise((resolve, reject) => {
    moviesModel.find({}, async function (err, data) {
      if (err) {
        reject(err);
      } else {
        if (data.length == 0) {
          let resp = await moviesDAL.getAllMoviesFromRestApi();
          let movies = resp.data.map((movie) => {
            return {
              name: movie.name,
              genres: movie.genres,
              image: movie.image.medium,
              premiered: movie.premiered,
            };
          });
          await moviesModel.insertMany(movies);
        }
        resolve(data);
      }
    });
  });
};

const getMovieByID = async (movieID) => {
  return new Promise((resolve, reject) => {
    moviesModel.findById(movieID, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const addMovie = async (movieData) => {
  return new Promise((resolve, reject) => {
    let movie = new moviesModel({ ...movieData });

    movie.save((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const updateMovie = async (movieID, movieData) => {
  return new Promise((resolve, reject) => {
    moviesModel.findByIdAndUpdate(movieID, movieData, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const deleteMovie = async (movieID) => {
  return new Promise((resolve, reject) => {
    moviesModel.findByIdAndDelete(movieID, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = {
  getAllMovies,
  getMovieByID,
  addMovie,
  updateMovie,
  deleteMovie,
};
