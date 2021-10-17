import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import axios from "axios";
import MovieComp from "./Movie";
import { useDispatch, useSelector } from "react-redux";
import SearchMovieField from "./SearchMovieField"


const AllMoviesComp = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    let fetchData = async () => {
      let resp = await axios.get("http://localhost:4000/api/movies");
      dispatch({ type: "ADD_ALL_MOVIES", payload: resp.data });
    };
    fetchData();
  }, []);


  const listMovies = movies.filter(movie => movie.name.includes(searchField))

  return (
    <Container>
      <SearchMovieField setSearch={setSearchField} search={searchField} />
      <h2>Movies</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
        }}
      >
        {listMovies.map((movie) => {
          return <MovieComp key={movie._id} movie={movie}  />;
        })}
      </div>
    </Container>
  );
};

export default AllMoviesComp;
