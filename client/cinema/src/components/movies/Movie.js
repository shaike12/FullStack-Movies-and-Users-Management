import { Card, Button, List, Avatar, Stack, Typography } from "@mui/material";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

const MovieComp = ({ movie }) => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [membersWatched, setMembersWatched] = useState([]);
  const history = useHistory();

  const deleteMovie = async (movieID) => {
    await axios.delete("http://localhost:4000/api/movies/" + movieID);
    dispatch({ type: "DELETE_MOVIE", payload: movieID });
  };

  useEffect(() => {
    const fetchData = async () => {
      let fetchParams = {
        headers: { "x-access-token": localStorage.getItem("authUser") },
      };

      try {
        let resp = await axios.get(
          "http://localhost:4000/api/subscriptions/",
          fetchParams
        );
        let allSubscriptions = resp.data;
        if (allSubscriptions.auth) {
          console.log("your are not the login user");
        } else {
          // Find Members That are Watched This Movie
          let membersWatchedMovie = allSubscriptions.filter((sub) =>
          sub.movies.some((m) => m._id === movie._id)
          );
          
          try {
            let membersWatchedMovie2 = await Promise.all(
              membersWatchedMovie.map(async (x) => {
                let i = x.movies.findIndex((item) => item._id === movie._id);
                let memberName = await axios.get(
                  "http://localhost:4000/api/members/" + x.memberId,
                  fetchParams
                  );

                  if (memberName) {
                  return {
                    memberId: x.memberId,
                    name: memberName.data.name
                    ? memberName.data.name
                    : "Name Not Exists",
                    date: x.movies[i].date,
                  };
                }
              })
            );
            
            setMembersWatched(membersWatchedMovie2);
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Card
      sx={{ maxWidth: 345 }}
      style={{ padding: "20px", border: "1px solid grey" }}
    >
      <h3>
        {movie.name}, {movie.premiered}
      </h3>
      <Typography>Genres: {movie.genres.join(", ")}</Typography>
      <br />
      <img src={movie.image} alt={movie.name} />
      <div style={{ padding: "20px" }}>
        <h4>Subscriptions Watched</h4>
        <ul>
          {membersWatched.map((member) => (
            <List key={member.memberId}>
              <Stack direction='row' spacing={2}>
                <Avatar
                  sx={{ width: 14, height: 14 }}
                  alt={member.name}
                  // src={__dirname + '\public\member_avatar.png'}
                />
                <a href={"/main/subscriptions/member_page/" + member.memberId}>
                  {member.name ? member.name : "Not Found"}
                </a>
                , {member.date}
              </Stack>
            </List>
          ))}
        </ul>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button variant='contained' style={{ width: "100px" }}>
          <Link className='edit' to={path + `/edit_movie/${movie._id}`}>
            Edit
          </Link>
        </Button>
        <Button variant='outlined' onClick={() => deleteMovie(movie._id)}>
          Delete
        </Button>
      </div>
      <br />
    </Card>
  );
};

export default MovieComp;
