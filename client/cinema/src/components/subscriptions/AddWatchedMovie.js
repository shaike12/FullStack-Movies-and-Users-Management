import React, { useEffect, useState } from "react";
import axios from "axios";

const AddWatchedMovieComp = ({addNewMovie, watchedMovies }) => {
  const [unwatchedMovies, setUnwatchedMovies] = useState([]);
  const [movieIdField, setMovieIdField] = useState("");
  const [dateField, setDateField] = useState(
    new Date().toISOString().substring(0, 10)
  );


  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);

  const addNew = async (e) => {
    e.preventDefault();
    addNewMovie({ _id: movieIdField, date: dateField });
  };

  return (
    <div>
      <form onSubmit={addNew}>
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
    </div>
  );
};

export default AddWatchedMovieComp;
