import "../App.css";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddUserComp from "../components/usersManagement/AddUser"
import AllUsersComp from "../components/usersManagement/AllUsers";
import EditUserComp from "../components/usersManagement/EditUser";

function UsersManagementComp() {
  const { path } = useRouteMatch();

  return (
    <>
    <div className='App'>
      <Button variant='contained'>
        <Link to={path}>All Users</Link>
      </Button>

      <Button variant='contained'>
        <Link to={path + "/add_user"}>Add User</Link>
      </Button>

    </div>
      <Switch>
        <Route exact path={path}>
          <AllUsersComp />
        </Route>
        <Route path={path + "/add_User"}>
          <AddUserComp />
        </Route>
        <Route path={path + "/edit_User/:id"}>
          <EditUserComp/>
        </Route>
      </Switch>
      </>
  );
}

export default UsersManagementComp;
