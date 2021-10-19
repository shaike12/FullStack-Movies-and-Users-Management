import "../App.css";
import { Route, Switch, Link } from "react-router-dom";
import MoviesComp from "./Movies";
import MembersComp from "./Members";
import UsersManagementComp from "./UsersManagement";
import { Button, Stack, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

function MainPageComp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/login");
  };

  return (
    <Container style={{ textAlign: "center", padding: "10px" }}>
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
        <Button variant='outlined'>
          <Link to='/main/users_management'>Users Management</Link>
        </Button>
        <Button variant='contained' onClick={logout}>
          Logout
        </Button>
      </Stack>

      <Switch>
        <Route path='/main/movies' component={MoviesComp} />
        <Route path='/main/subscriptions' component={MembersComp} />
        <Route path='/main/users_management' component={UsersManagementComp} />
      </Switch>
    </Container>
  );
}

export default MainPageComp;
