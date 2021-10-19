import { Button, TextField, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "axios";

const EditMovieComp = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      let resp = await axios.get("http://localhost:4000/api/movies/" + id);
      setMovie({ ...resp.data });
    }
    fetchData();
  }, [id]);

  const updateMovie = async () => {
    try {
      await axios.put("http://localhost:4000/api/movies/" + id, movie);
      dispatch({ type: "UPDATE_MOVIE", payload: { movie, id } });
      history.push("/main/movies");
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
      <h2>Edit Movie</h2>
      <TextField
        fullWidth
        required
        value={movie.name}
        onChange={(e) => setMovie({ ...movie, name: e.target.value })}
        InputLabelProps={{
          shrink: movie.name ? true : false,
        }}
        label='Name:'
      />
      <TextField
        fullWidth
        required
        value={movie.premiered}
        onChange={(e) => setMovie({ ...movie, premiered: e.target.value })}
        InputLabelProps={{
          shrink: movie.premiered ? true : false,
        }}
        label='Premiered:'
      />
      <TextField
        fullWidth
        required
        value={movie.image}
        onChange={(e) => setMovie({ ...movie, image: e.target.value })}
        InputLabelProps={{
          shrink: movie.image ? true : false,
        }}
        label='Image:'
      />
      <TextField
        fullWidth
        required
        value={movie.genres}
        onChange={(e) =>
          setMovie({ ...movie, genres: e.target.value.split(",") })
        }
        InputLabelProps={{
          shrink: movie.genres ? true : false,
        }}
        label='Genres:'
      />
      <div
        style={{
          display: "flex",
          direction: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Button variant='contained' onClick={updateMovie}>
          Update
        </Button>
        <Button variant='outlined' onClick={() => history.push("/main/movies")}>
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default EditMovieComp;
