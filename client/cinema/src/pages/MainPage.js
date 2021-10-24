import "../App.css";
import { Route, Switch, Link } from "react-router-dom";
import MoviesComp from "./Movies";
import MembersComp from "./Members";
import UsersManagementComp from "./UsersManagement";
import { Button, Stack, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";

const MINUTES = 1000 * 60;

function MainPageComp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("authUser");
    history.push("/login");
  };

  useEffect(() => {
    if (localStorage["authUser"]) {
      const time = 10 * MINUTES;
      setTimeout(() => {
        localStorage.removeItem("authUser");
        window.alert("Session is Finish... Make New Login");
      }, time);
    }
  }, []);

  return (
    <Container style={{ textAlign: "center", padding: "10px" }}>
      {localStorage["authUser"] && (
        <Button
          sx={{ backgroundColor: "red" }}
          variant='contained'
          onClick={logout}
        >
          Logout
        </Button>
      )}

      <h2>Movies - Subscriptions Web Site</h2>
      {auth && (
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
          {localStorage["authUser"] && (
            <Button variant='outlined'>
              <Link to='/main/users_management'>Users Management</Link>
            </Button>
          )}
        </Stack>
      )}
      <Switch>
        <Route path='/main/movies' component={MoviesComp} />
        <Route path='/main/subscriptions' component={MembersComp} />
        <Route path='/main/users_management' component={UsersManagementComp} />
      </Switch>
    </Container>
  );
}

export default MainPageComp;
