import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import AddMovieComp from "../components/movies/AddMovie";
import AllMoviesComp from "../components/movies/AllMovies";
import { Button, Container, Stack } from "@mui/material";
import EditMovieComp from "../components/movies/EditMovie";
import { useState, useEffect } from "react";

function MoviesComp() {
  const { path } = useRouteMatch();
  const [createPersmission, setCreatePermission] = useState(false);
  const [editPersmission, setEditPermission] = useState(false);

  useEffect(() => {
    setCreatePermission(
      JSON.parse(localStorage.getItem("authUser")).user.permissions.some(
        (x) => x === "Create Movies"
      )
    );
    setEditPermission(
      JSON.parse(localStorage.getItem("authUser")).user.permissions.some(
        (x) => x === "Update Movies"
      )
    );
  }, []);

  return (
    <Container fixed style={{ justifyContent: "center" }}>
      <Stack
        style={{ justifyContent: "center", margin: "20px 40px" }}
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
      >
        <Button variant='outlined'>
          <Link to={path}>All Movies</Link>
        </Button>
        {createPersmission && (
          <Button variant='outlined'>
            <Link to={path + "/add_movie"}>Add Movie</Link>
          </Button>
        )}
      </Stack>

      <Switch>
        <Route exact path={path}>
          <AllMoviesComp />
        </Route>
        {createPersmission && (
          <Route path={path + "/add_movie"}>
            <AddMovieComp />
          </Route>
        )}
        {editPersmission && (
          <Route path={path + "/edit_movie/:id"}>
            <EditMovieComp />
          </Route>
        )}
        
      </Switch>
    </Container>
  );
}

export default MoviesComp;
