import React, { useEffect, useState } from "react";
import { Container, Button, LinearProgress } from "@mui/material";
import axios from "axios";
import MovieComp from "./Movie";
import { useDispatch, useSelector } from "react-redux";
import SearchMovieField from "./SearchMovieField";

const AllMoviesComp = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const [searchField, setSearchField] = useState("");
  const [num, setNum] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    let fetchData = async () => {
      const fetchParams = {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("authUser")).token,
        },
      };

      try {
        let resp = await axios.get(
          "http://localhost:4000/api/movies",
          fetchParams
        );

        // Check if Token Is Correct and Get All movies
        if (resp.auth) {
          console.log("your are not the login user");
        } else {
          let allMovies = resp.data;
          setHasPermission(JSON.parse(localStorage.getItem("authUser")).user.permissions.some(
            (x) => x === "View Movies"
          ))
          dispatch({ type: "ADD_ALL_MOVIES", payload: allMovies });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const listMovies = movies.filter((movie) => movie.name.includes(searchField));

  return (
    <Container>
      <h2>Movies</h2>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div>
          <SearchMovieField setSearch={setSearchField} search={searchField} />
          {hasPermission && (
            <>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "30px",
                  justifyContent: "center",
                }}
              >
                {listMovies.slice(0, num).map((movie) => {
                  return <MovieComp key={movie._id} movie={movie} />;
                })}
              </div>
              <br />
              <div>
                {listMovies.length === 0
                  ? "No Movies"
                  : listMovies.length >= 10 && (
                      <Button
                        variant='contained'
                        onClick={() => setNum(num + 10)}
                      >
                        10 More...
                      </Button>
                    )}
              </div>
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default AllMoviesComp;
