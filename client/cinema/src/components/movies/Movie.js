import { Container, Button } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

const MovieComp = ({ movie }) => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [membersWatched, setMembersWatched] = useState([]);

  const deleteMovie = async (movieID) => {
    await axios.delete("http://localhost:4000/api/movies/" + movieID);
    dispatch({ type: "DELETE_MOVIE", payload: movieID });
  };

  useEffect(() => {
    const fetchData = async () => {
      let resp = await axios.get("http://localhost:4000/api/subscriptions/");
      let subs = resp.data;

      let subsWatched = subs.filter((sub) => {
        let i = sub.movies.find((item) => item._id === movie._id);
        if (i) {
          return true;
        }

        return false;
      });

      subsWatched = await Promise.all(
        subsWatched.map(async (x) => {
          let i = x.movies.findIndex((item) => item._id === movie._id);
          let memberName = await axios.get(
            "http://localhost:4000/api/members/" + x.memberId
          );
          if (memberName.data){
            return {
              memberId: x.memberId,
              name: memberName.data.name,
              date: x.movies[i].date,
            };
          }
          else {
            return {
              memberId: "Member Not Exists",
              name: "Member Not Exists",
              date: x.movies[i].date,
            }; 
          }
        })
      );
      setMembersWatched(subsWatched);
    };

    fetchData();
  }, [movie._id]);

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
          {membersWatched.map((member) => (
            <li key={member.memberId}>
              <a href={"/main/subscriptions/member_page/" + member.memberId}>
                {member.name ? member.name : "Not Found"}
              </a>
              , {member.date}
            </li>
          ))}
        </ul>
      </div>
      <br/>
      <Button variant="outlined">
        <Link to={path + `/edit movie/${movie._id}`}>Edit</Link>
      </Button>
      <Button variant="outlined" onClick={() => deleteMovie(movie._id)}>Delete</Button><br/>
    </Container>
  );
};

export default MovieComp;
