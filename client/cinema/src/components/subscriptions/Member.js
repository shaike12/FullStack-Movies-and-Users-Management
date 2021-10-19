import React, { useEffect, useState } from "react";
import { Card, Button, Divider, ListItem } from "@mui/material";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import AddWatchedMovieComp from "./AddWatchedMovie";

const MemberComp = ({ member }) => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const deleteMember = async (memberID) => {
    await axios.delete("http://localhost:4000/api/members/" + memberID);
    dispatch({ type: "DELETE_MEMBER", payload: memberID });
  };

  const addNewMovie = async (newMovie) => {
    let resp = await axios.get(
      `http://localhost:4000/api/subscriptions/${member._id}`
    );
    let sub = resp.data;
    if (sub.length === 0) {
      let obj = {
        memberId: member._id,
        movies: [newMovie],
      };
      await axios.post("http://localhost:4000/api/subscriptions", obj);
    } else {
      sub[0].movies.push(newMovie);
      delete sub[0]._id;
      await axios.put(
        `http://localhost:4000/api/subscriptions/${member._id}`,
        sub[0]
      );
    }
    setIsShow(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      let resp = await axios.get(
        `http://localhost:4000/api/subscriptions/${member._id}`
      );

      if (resp.data.length > 0) {
        let data = await Promise.all(
          resp.data[0].movies.map(async (movie) => {
            let movieData = await axios.get(
              `http://localhost:4000/api/movies/${movie._id}`
            );

            if (movieData.data) {
              movie.name = movieData.data.name;
            }

            return movie;
          })
        );
        setWatchedMovies(data);
      }
    };
    fetchData();
  }, [isShow, member._id]);

  return (
    <Card style={{ border: "1px solid black", width: "400px" }}>
      <div>
        <h2>{member.name}</h2>
        <div>Email: {member.email} </div>
        <div>City: {member.city} </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "20px",
          }}
        >
          <Button variant='outlined'>
            <Link to={path + `/edit_member/${member._id}`}>Edit</Link>
          </Button>
          <Button variant='outlined' onClick={() => deleteMember(member._id)}>
            Delete
          </Button>
        </div>
      </div>

      <Button variant='contained' onClick={() => setIsShow(!isShow)}>
        Subscribe New Movie
      </Button>
      {/* Show Add New Watched Movie  */}
      {isShow && (
        <AddWatchedMovieComp
          id={member._id}
          addNewMovie={addNewMovie}
          watchedMovies={watchedMovies}
        />
      )}

      {/* Show All Watched Movies */}
      <h3>Movies Watched</h3>
      <ul>
        {watchedMovies.map((movie) => (
          <ListItem disablePadding key={movie._id}>
            <ListItem>
              <a href={"/main/movies/movie_page/" + movie._id}>
                {movie.name ? movie.name : "Not Found"}
              </a>
            </ListItem>

            <ListItem>{movie.date}</ListItem>
            <Divider />
          </ListItem>
        ))}
      </ul>
    </Card>
  );
};

export default MemberComp;
