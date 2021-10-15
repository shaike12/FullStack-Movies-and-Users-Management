import React, { useState } from "react";
import { Container, Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";

const AddMovieComp = () => {
  const [movie, setMovie] = useState({
    name: "",
    premiered: "",
    image: "",
    genres: [],
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const addMovie = async () => {
    try {
      let resp = await axios.post("http://localhost:4000/api/movies", movie);
      dispatch({ type: "ADD_MOVIE", payload: {_id: resp, ...movie} });
      history.push("/main/movies");
    } catch (err) {
      console.log("Unable to Add Movie", err);
    }
  };

  return (
    <Container>
      <h2>Add Movie</h2>
      <form>
        Name:{" "}
        <input
          type='text'
          onChange={(e) => setMovie({ ...movie, name: e.target.value })}
        />
        <br />
        Premiered:{" "}
        <input
          type='text'
          onChange={(e) => setMovie({ ...movie, premiered: e.target.value })}
        />
        <br />
        Image:{" "}
        <input
          type='text'
          onChange={(e) => setMovie({ ...movie, image: e.target.value })}
        />
        <br />
        Genres:{" "}
        <input
          type='text'
          onChange={(e) =>
            setMovie({ ...movie, genres: e.target.value.split(",") })
          }
        />
        <br />
        <Button onClick={addMovie}>Add</Button>
        <Button onClick={() => history.push("/main/movies")}>Cancel</Button>
      </form>
    </Container>
  );
};

export default AddMovieComp;
