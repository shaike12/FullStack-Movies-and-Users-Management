import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router";

const MoviePageComp = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchParams = {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("authUser")).token,
      },
    };
    const fetchData = async () => {
      let resp = await axios.get(
        "http://localhost:4000/api/movies/" + id,
        fetchParams
      );
      setMovie(resp.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Movie Page</h2>
      <h3>{movie.name}</h3>
      <img src={movie.image} alt={movie.name} />
    </div>
  );
};

export default MoviePageComp;
