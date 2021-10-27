import React, { useEffect, useState } from "react";
import { Card, Button, ListItem } from "@mui/material";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import AddWatchedMovieComp from "./AddWatchedMovie";

const MemberComp = ({ member }) => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [permissions, setPermissions] = useState([]);

  const deleteMember = async (memberID) => {
    const fetchParams = {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("authUser")).token,
      },
    };
    try {
      await axios.delete(
        "http://localhost:4000/api/members/" + memberID,
        fetchParams
      );
      dispatch({ type: "DELETE_MEMBER", payload: memberID });
    } catch (err) {
      console.log(err);
    }
  };

  const addNewMovie = async (newMovie) => {
    const fetchParams = {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("authUser")).token,
      },
    };
    try {
      let resp = await axios.get(
        `http://localhost:4000/api/subscriptions/${member._id}`,
        fetchParams
      );
      let sub = resp.data;
      if (sub.length === 0) {
        let obj = {
          memberId: member._id,
          movies: [newMovie],
        };
        await axios.post(
          "http://localhost:4000/api/subscriptions",
          obj,
          fetchParams
        );
      } else {
        sub[0].movies.push(newMovie);
        delete sub[0]._id;
        await axios.put(
          `http://localhost:4000/api/subscriptions/${member._id}`,
          sub[0],
          fetchParams
        );
      }

      setIsShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchParams = {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("authUser")).token,
        },
      };
      let resp = await axios.get(
        `http://localhost:4000/api/subscriptions/${member._id}`,
        fetchParams
      );

      // If User Not Authorized 
      if (resp.auth) {
        console.log("your are not the login user");
      } else {
        // If User Is Authorized
        setPermissions(
          JSON.parse(localStorage.getItem("authUser")).user.permissions
        );
        if (resp.data.length > 0) {
          let data = await Promise.all(
            resp.data[0].movies.map(async (movie) => {
              let movieData = await axios.get(
                `http://localhost:4000/api/movies/${movie._id}`,
                fetchParams
              );

              if (movieData.data) {
                movie.name = movieData.data.name;
              }

              return movie;
            })
          );
          setWatchedMovies(data);
        }
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
          {permissions.some((x) => x === "Update Subscriptions") && (
            <Button variant='outlined'>
              <Link to={path + `/edit_member/${member._id}`}>Edit</Link>
            </Button>
          )}
          {permissions.some((x) => x === "Delete Subscriptions") && (
            <Button variant='outlined' onClick={() => deleteMember(member._id)}>
              Delete
            </Button>
          )}
        </div>
      </div>

      <Button variant='contained' onClick={() => setIsShow(!isShow)}>
        Subscribe New Movie
      </Button>
      {/* Add New Watched Movie  */}
      {isShow && (
        <AddWatchedMovieComp
          id={member._id}
          addNewMovie={addNewMovie}
          watchedMovies={watchedMovies}
        />
      )}

      {/* Show All Watched Movies */}
      <h3>Movies Watched</h3>
      <ul style={{ overflow: "auto", width: "100%", maxHeight: "250px" }}>
        {watchedMovies.map((movie) => (
          <ListItem disablePadding key={movie._id}>
            <a href={"/main/movie_page/" + movie._id}>
              {movie.name ? movie.name : "Not Found"}
            </a>

            <div
              style={{ width: "100px", textAlign: "right", fontWeight: "bold" }}
            >
              {movie.date}
            </div>
          </ListItem>
        ))}
      </ul>
    </Card>
  );
};

export default MemberComp;
