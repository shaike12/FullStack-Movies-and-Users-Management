import "../App.css";
import { Route, Switch, Link } from "react-router-dom";
import MoviesComp from "./Movies";
import MembersComp from "./Members";
import UsersManagementComp from "./UsersManagement";
import { Button, Stack, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";


function MainPageComp() {
  return (
    <Container style={{textAlign:"center", padding: "10px"}}>
      <h2>Movies - Subscriptions Web Site</h2>
      <Stack
        style={{justifyContent: "center"}}
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
        <Button  variant='contained'>Logout</Button>
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
