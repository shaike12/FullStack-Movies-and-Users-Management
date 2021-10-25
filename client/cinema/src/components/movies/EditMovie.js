import { Button, TextField, Box, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import axios from "axios";

const EditMovieComp = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchParams = {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("authUser")).token,
      },
    };
    async function fetchData() {
      try {
        let resp = await axios.get(
          "http://localhost:4000/api/movies/" + id,
          fetchParams
        );
        if (resp.auth) {
          console.log("your are not the login user");
        } else {
          let allMovies = resp.data;
          setMovie({ ...allMovies });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const updateMovie = async () => {
    const fetchParams = {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("authUser")).token,
      },
    };
    try {
      await axios.put(
        "http://localhost:4000/api/movies/" + id,
        movie,
        fetchParams
      );
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
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
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
            <Button
              variant='outlined'
              onClick={() => history.push("/main/movies")}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Box>
  );
};

export default EditMovieComp;
