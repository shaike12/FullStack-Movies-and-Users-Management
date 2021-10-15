import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from 'axios'

const EditMovieComp = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      let resp = await axios.get("http://localhost:4000/api/movies/" + id );
      setMovie({...resp.data});
    }
    fetchData();
  }, []);

  const updateMovie = async () => {
    try {
      await axios.put("http://localhost:4000/api/movies/" + id, movie );
      dispatch({ type: "UPDATE_MOVIE", payload: { movie, id } });
      history.push("/main/movies");
    } catch (err) {
      console.log("Unable to Add Movie", err);
    }
  };

  return (
    <div>
            <h2>Edit Movie</h2>

      <form>
        Name:{" "}
        <input
          type='text'
          value={movie.name}
          onChange={(e) => setMovie({ ...movie, name: e.target.value })}
        />
        <br />
        Premiered:{" "}
        <input
          type='text'
          value={movie.premiered}
          onChange={(e) => setMovie({ ...movie, premiered: e.target.value })}
        />
        <br />
        Image:{" "}
        <input
          type='text'
          value={movie.image}
          onChange={(e) => setMovie({ ...movie, image: e.target.value })}
        />
        <br />
        Genres:{" "}
        <input
          type='text'
          value={movie.genres}
          onChange={(e) =>
            setMovie({ ...movie, genres: e.target.value.split(",") })
          }
        />
        <br />
        <Button onClick={updateMovie}>Update</Button>
        <Button onClick={() => history.push("/main/movies")}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default EditMovieComp;
