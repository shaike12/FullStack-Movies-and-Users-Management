import React, { useEffect, useState } from "react";
import { Container, Button, ImageList } from "@mui/material";
import axios from "axios";
import MovieComp from "./Movie";
import { useDispatch, useSelector } from "react-redux";
import SearchMovieField from "./SearchMovieField";

const AllMoviesComp = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const [searchField, setSearchField] = useState("");
  const [num, setNum] = useState(10);

  useEffect(() => {
    let fetchData = async () => {
      let resp = await axios.get("http://localhost:4000/api/movies");
      dispatch({ type: "ADD_ALL_MOVIES", payload: resp.data });
    };
    fetchData();
  }, []);

  const listMovies = movies.filter((movie) => movie.name.includes(searchField));

  return (
    <Container>
      <h2>Movies</h2>
      <SearchMovieField setSearch={setSearchField} search={searchField} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
        }}
      >
        {listMovies
          .reverse()
          .slice(0, num)
          .map((movie) => {
            return <MovieComp key={movie._id} movie={movie} />;
          })}
        <br />
      </div>
      <br />
      {listMovies.length === 0 ? (
        "No Movies"
      ) : (
        <Button variant='contained' onClick={() => setNum(num + 10)}>
          10 More...
        </Button>
      )}
    </Container>
  );
};

export default AllMoviesComp;
