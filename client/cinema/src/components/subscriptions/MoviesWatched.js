import React, { useEffect, useState } from "react";
import axios from "axios";

const MoviesWatchedComp = ({ id }) => {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [unwatchedMovies, setUnwatchedMovies] = useState([]);
  const [movieIdField, setMovieIdField] = useState("");
  const [dateField, setDateField] = useState(
    new Date().toISOString().substring(0, 10)
  );

  const showForm = async () => {
    let resp = await axios.get("http://localhost:4000/api/movies");
    let f = resp.data;
    let moviesSelect = f.filter((movie) => {
      if (watchedMovies.some((s) => s._id === movie._id)) {
        return false;
      }
      return true;
    });

    setUnwatchedMovies(moviesSelect);
    setMovieIdField(moviesSelect[0]._id);
    setIsShow(!isShow);
  };

  useEffect(() => {
    const fetchData = async () => {
      let resp = await axios.get(
        `http://localhost:4000/api/subscriptions/${id}`
      );
      console.log(resp.data);
      if (resp.data.length > 0) {
        let g = await Promise.all(
          resp.data[0].movies.map(async (movie) => {
            let movieData = await axios.get(
              `http://localhost:4000/api/movies/${movie._id}`
            );

            if (movieData.data) {
              movie.name = movieData.data.name;
            }

            return movie;
          })
        );
        setWatchedMovies(g);
      }
    };
    fetchData();
  }, []);

  const addNewMovie = async (e) => {
    e.preventDefault();
    let resp = await axios.get(`http://localhost:4000/api/subscriptions/${id}`);
    let sub = resp.data;

    if (sub.length == 0) {
      let newMovie = {
        memberId: id,
        movies: [{ _id: movieIdField, date: dateField }],
      };
      await axios.post("http://localhost:4000/api/subscriptions", newMovie);
    } else {
      sub[0].movies.push({ _id: movieIdField, date: dateField });
      delete sub[0]._id;
      console.log(sub);
      await axios.put(`http://localhost:4000/api/subscriptions/${id}`, sub[0]);
    }
  };

  return (
    <div>
      <h2>Movies Watched</h2>
      <div>
        <button onClick={showForm}>Subscribe New Movie</button>
        {isShow && (
          <form onSubmit={addNewMovie}>
            <h4>Add a New Movie</h4>
            <select onChange={(e) => setMovieIdField(e.target.value)}>
              {unwatchedMovies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.name}
                </option>
              ))}
            </select>
            <input
              type='date'
              value={dateField}
              onChange={(e) => setDateField(e.target.value)}
            />
            <br />
            <input type='submit' value='Subscribe' />
          </form>
        )}
        <ul>
          {watchedMovies.length > 0 &&
            watchedMovies.map((movie) => (
              <li key={movie._id}>
                <a href={"/main/movies/movie_page/" + movie._id}>
                  {movie.name ? movie.name : "Not Found"}
                </a>
                ,{movie.date}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MoviesWatchedComp;
