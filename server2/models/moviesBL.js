const apiDAL = require("../Dals/apiDAL");

const getMovies = async () => {
  let resp = await apiDAL.getAllDocs("movies");
  return resp.data;
};

const getMovieByID = async (id) => {
  let resp = await apiDAL.getDocByID("movies", id);
  return resp.data;
};

const addMovie = async (movie) => {
  let resp = await apiDAL.addDoc("movies", movie);
  return resp.data;
};

const updateMovie = async (movieID, movie) => {
  let resp = await apiDAL.updateDoc("movies", movieID, movie);
  return resp.data;
};

const deleteMovie = async (movieID) => {
  let resp = await apiDAL.deleteDoc("movies", movieID);
  return resp.data;
};

module.exports = {
  getMovies,
  getMovieByID,
  addMovie,
  updateMovie,
  deleteMovie,
};
