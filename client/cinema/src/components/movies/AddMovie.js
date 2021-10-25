import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { useHistory } from "react-router";
import axios from "axios";

const AddMovieComp = () => {
  const [movie, setMovie] = useState({
    name: "",
    premiered: "",
    image: "",
    genres: [],
  });
  const history = useHistory();
  const [error, setError] = useState("");

  const addMovie = async () => {
    if (
      movie.name === "" ||
      movie.premiered === "" ||
      movie.genres.length === 0
    ) {
      setError("Requierd All *");
      return null;
    }
    const fetchParams = {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("authUser")).token,
      },
    };
    try {
      let resp = await axios.post(
        "http://localhost:4000/api/movies",
        movie,
        fetchParams
      );
      if (resp.auth) {
        console.log("your are not the login user");
      } else {

        history.push("/main/movies");
      }
    } catch (err) {
      console.log("Unable to Add Movie", err);
    }
  };

  return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { m: 2 },
      }}
      noValidate
      autoComplete='off'
      style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}
    >
      <h2>Add Movie</h2>
      <span style={{ color: "red", float: "left" }}>{error}</span>
      <TextField
        required
        fullWidth
        type='text'
        onChange={(e) => setMovie({ ...movie, name: e.target.value })}
        label='Name:'
      />
      <TextField
        required
        fullWidth
        type='text'
        onChange={(e) => setMovie({ ...movie, premiered: e.target.value })}
        label='Premiered:'
      />
      <TextField
        type='text'
        fullWidth
        onChange={(e) => setMovie({ ...movie, image: e.target.value })}
        label='Image:'
      />
      <TextField
        required
        fullWidth
        type='text'
        onChange={(e) =>
          setMovie({ ...movie, genres: e.target.value.split(",") })
        }
        label='Genres:'
      />
      <div
        style={{
          display: "flex",
          direction: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Button variant='contained' onClick={addMovie}>
          Add
        </Button>
        <Button variant='outlined' onClick={() => history.push("/main/movies")}>
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default AddMovieComp;
