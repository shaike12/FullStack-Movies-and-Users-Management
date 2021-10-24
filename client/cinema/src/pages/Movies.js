import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import AddMovieComp from "../components/movies/AddMovie";
import AllMoviesComp from "../components/movies/AllMovies";
import { Button, Container, Stack } from "@mui/material";
import EditMovieComp from "../components/movies/EditMovie";
import MoviePageComp from "./MoviePage";

function MoviesComp() {
  const { path } = useRouteMatch();
  
  return (
    <Container fixed style={{justifyContent: "center"}}>
      <Stack
        style={{ justifyContent: "center", margin: "20px 40px" }}
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
      >
        <Button variant='outlined'>
          <Link to={path}>All Movies</Link>
        </Button>
        <Button variant='outlined'>
          <Link to={path + "/add_movie"}>Add Movie</Link>
        </Button>
      </Stack>

      <Switch>
        <Route exact path={path}>
          <AllMoviesComp />
        </Route>
        <Route path={path + "/add_movie"}>
          <AddMovieComp />
        </Route>
        <Route path={path + "/edit_movie/:id"}>
          <EditMovieComp />
        </Route>
        <Route path={path + "/movie_page/:id"}>
          <MoviePageComp />
        </Route>
      </Switch>
    </Container>
  );
}

export default MoviesComp;
