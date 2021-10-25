import "../App.css";
import { Route, Switch, Link } from "react-router-dom";
import MoviesComp from "./Movies";
import MembersComp from "./Members";
import UsersManagementComp from "./UsersManagement";
import { Button, Stack, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";
import MoviePageComp from "./MoviePage";
import MemberPageComp from "./MemberPage";

const MINUTES = 1000 * 60;

function MainPageComp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("authUser");
    history.push("/login");
  };

  useEffect(() => {
    if (localStorage["authUser"]) {
      if (
        JSON.parse(localStorage.getItem("authUser")).user.username !== "admin"
      ) {
        const time =
          JSON.parse(localStorage.getItem("authUser")).user.session_timeout *
          MINUTES;
        setTimeout(() => {
          localStorage.removeItem("authUser");
          window.alert("Session is Finish... Make New Login");
          history.push("/login");
        }, time);
      }
      // dispatch({ type: "LOGIN", payload: localStorage["authUser"] });
    }
  }, []);

  return (
    <Container style={{ textAlign: "center", padding: "10px" }}>
      {localStorage["authUser"] && (
        <>
          <Button
            sx={{ backgroundColor: "red" }}
            variant='contained'
            onClick={logout}
          >
            Logout
          </Button>

          <h2>Movies - Subscriptions Web Site</h2>
          <Stack
            style={{ justifyContent: "center" }}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <Button variant='outlined'>
              <Link to='/main/movies'>Movies</Link>
            </Button>
            <Button variant='outlined'>
              <Link to='/main/subscriptions'>Subscriptions</Link>
            </Button>
            {JSON.parse(localStorage.getItem("authUser")).user.username ===
              "admin" && (
              <Button variant='outlined'>
                <Link to='/main/users_management'>Users Management</Link>
              </Button>
            )}
          </Stack>
          <Switch>
            <Route path='/main/movies' component={MoviesComp} />
            <Route path='/main/subscriptions' component={MembersComp} />
            {JSON.parse(localStorage.getItem("authUser")).user.username ===
              "admin" && (
              <Route
                path='/main/users_management'
                component={UsersManagementComp}
              />
            )}
            <Route path='/main/movie_page/:id'>
              <MoviePageComp />
            </Route>
          </Switch>
          <Route path={"/main/member_page/:id"}>
            <MemberPageComp />
          </Route>
        </>
      )}
    </Container>
  );
}

export default MainPageComp;
