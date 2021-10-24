import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";

const AddWatchedMovieComp = ({ addNewMovie, watchedMovies }) => {
  const [unwatchedMovies, setUnwatchedMovies] = useState([]);
  const [movieIdField, setMovieIdField] = useState("");
  const [dateField, setDateField] = useState(
    new Date().toISOString().substring(0, 10)
  );

  useEffect(() => {
    const fetchData = async () => {
      // Getting All Movies and Find The Ones That are Never Watched
      let fetchParams = {
        headers: { "x-access-token": localStorage.getItem("authUser") },
      };
      try {
        let resp = await axios.get(
          "http://localhost:4000/api/movies",
          fetchParams
        );

        if (resp.auth) {
          console.log("your are not the login user");
        } else {
          let allMovies = resp.data;
          let selectContent = allMovies.filter(
            (movie) => !watchedMovies.some((s) => s._id === movie._id)
          );
          setUnwatchedMovies(selectContent);
          //Set Default Value For Selcet Input
          setMovieIdField(selectContent[0]._id);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Add New Selected Movie To Watched
  const addNew = async (e) => {
    e.preventDefault();
    addNewMovie({ _id: movieIdField, date: dateField });
  };

  return (
    <FormControl sx={{ m: 2, minWidth: 80 }}>
      <InputLabel size='small'>Choose a movie</InputLabel>
      <Select
        autoWidth
        size='small'
        label='Choose a movie'
        value={movieIdField}
        onChange={(e) => setMovieIdField(e.target.value)}
      >
        {unwatchedMovies.length === 0 && (
          <MenuItem>All Movies Are Watched</MenuItem>
        )}
        {unwatchedMovies.map((movie) => (
          <MenuItem key={movie._id} value={movie._id}>
            {movie.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        size='small'
        type='date'
        value={dateField}
        onChange={(e) => setDateField(e.target.value)}
        style={{ marginTop: "20px" }}
      />
      <br />
      <Button
        variant='contained'
        size='small'
        style={{ width: "110px" }}
        onClick={addNew}
      >
        Subscribe
      </Button>
    </FormControl>
  );
};

export default AddWatchedMovieComp;
