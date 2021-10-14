import "../App.css";
import { Route, Switch ,Link } from "react-router-dom";
import MoviesComp from "./Movies";
import MembersComp from "./Members";
import UsersManagementComp from "./UsersManagement";
import {Button} from '@material-ui/core';

function MainPageComp() {
  return (
    <div className='App'>
      <h2>Movies - Subscriptions Web Site</h2>
      <menu>
        <Button variant="contained">
          <Link to='/main/movies'>Movies</Link>
        </Button>
        <Button variant="contained">
          <Link to='/main/subscriptions'>Subscriptions</Link>
        </Button >
        <Button variant="contained">
          <Link to='/main/users_management'>Users Management</Link>
        </Button>
        <Button variant="contained">Logout</Button>
      </menu>

      <Switch>
          <Route path='/main/movies' component={MoviesComp} />
          <Route path='/main/subscriptions' component={MembersComp} />
            <Route
              path='/main/users_management'
              component={UsersManagementComp}
            />
        </Switch>
    </div>
  );
}

export default MainPageComp;
