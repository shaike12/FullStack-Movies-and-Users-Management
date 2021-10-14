import "../App.css";
import { Link, useRouteMatch} from "react-router-dom";
import {Button} from '@material-ui/core';


function UsersManagementComp() {

      const { path } = useRouteMatch();


  return (
    <div className='App'>
            <Button variant="contained">
              <Link to={path}>All Users</Link>
            </Button>
            
              <Button>
                <Link to={path + "/add_user"}>Add User</Link>
              </Button>
    </div>
  );
}

export default UsersManagementComp;
