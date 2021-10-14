import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import axios from "axios";
import MovieComp from "./Movie";
import { useDispatch, useSelector } from "react-redux";

const AllMoviesComp = () => {
  const [listMovies, setListMovies] = useState([]);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state);

  const deleteMovie = async (movieID) => {
    await axios.delete("http://localhost:4000/api/movies/" + movieID);
    dispatch({type: "DELETE_MOVIE", payload: movieID})
  };

  useEffect(() => {
    let fetchData = async () => {
      let resp = await axios.get("http://localhost:4000/api/movies");
      dispatch({type: "ADD_ALL_MOVIES", payload: resp.data})
      setListMovies(resp.data);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h2>Movies</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
        }}
      >
        {movies.map((movie) => {
          return <MovieComp key={movie._id} movie={movie} deleteMovie={deleteMovie} />;
        })}
      </div>
    </Container>
  );
};

export default AllMoviesComp;
