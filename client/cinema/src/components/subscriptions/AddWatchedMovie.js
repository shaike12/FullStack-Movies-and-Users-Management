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
   
      <FormControl sx={{ m: 2, minWidth: 80}} >
        <InputLabel size='small'>Movie</InputLabel>
        <Select
        autoWidth
        size='small'
          onChange={(e) => setMovieIdField(e.target.value)}
        >
          {unwatchedMovies.reverse().map((movie) => (
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
          style={{marginTop: "20px"}}
        />
        <br/>
        <Button variant="contained" size='small' style={{width:"110px"}} onClick={addNew}>Subscribe</Button>
      </FormControl>
   
  );
};

export default AddWatchedMovieComp;
