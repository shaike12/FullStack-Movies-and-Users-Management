import "../App.css";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import { Button, Container, Stack } from "@mui/material";
import AddUserComp from "../components/usersManagement/AddUser";
import AllUsersComp from "../components/usersManagement/AllUsers";
import EditUserComp from "../components/usersManagement/EditUser";

function UsersManagementComp() {
  const { path } = useRouteMatch();

  return (
    <Container fixed style={{ justifyContent: "center" }}>
      <Stack
        style={{ justifyContent: "center", margin: "20px 40px" }}
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
      >
        <Button variant='outlined'>
          <Link to={path}>All Users</Link>
        </Button>

        <Button variant='outlined'>
          <Link to={path + "/add_user"}>Add User</Link>
        </Button>
      </Stack>

      <Switch>
        <Route exact path={path}>
          <AllUsersComp />
        </Route>
        <Route path={path + "/add_User"}>
          <AddUserComp />
        </Route>
        <Route path={path + "/edit_User/:id"}>
          <EditUserComp />
        </Route>
      </Switch>
    </Container>
  );
}

export default UsersManagementComp;
