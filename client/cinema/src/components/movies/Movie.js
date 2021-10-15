import { Container } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const MovieComp = ({ movie }) => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const deleteMovie = async (movieID) => {
    await axios.delete("http://localhost:4000/api/movies/" + movieID);
    dispatch({ type: "DELETE_MOVIE", payload: movieID });
  };


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
