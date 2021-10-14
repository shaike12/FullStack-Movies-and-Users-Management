import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

const MovieComp = ({ movie, deleteMovie }) => {
  const { path } = useRouteMatch();

  return (
    <Container style={{ border: "1px solid black", width: "400px" }}>
      <h3>
        {movie.name}, {movie.premiered}
      </h3>
      <div>Genres: {movie.genres}</div>
      <img src={movie.image} alt={movie.name} />
      <div style={{ border: "1px solid black" }}>
        <h4>Subscriptions Watched</h4>
        <ul>
          <li>Avi Cohen, 12/11/1998</li>
        </ul>
      </div>
      <button>
        <Link to={path + `/editMovie/${movie._id}`}>Edit</Link>
      </button>
      <button onClick={() => deleteMovie(movie._id)}>Delete</button>
    </Container>
  );
};

export default MovieComp;
