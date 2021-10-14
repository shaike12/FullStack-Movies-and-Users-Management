import "../App.css";
import { Link, useRouteMatch} from "react-router-dom";
import {Button} from '@material-ui/core';


function MembersComp() {

      const { path } = useRouteMatch();


  return (
    <div className='App'>
            <Button variant="contained">
              <Link to={path}>All Members</Link>
            </Button>
            
              <Button variant="contained">
                <Link to={path + "/add_member"}>Add Member</Link>
              </Button>
    </div>
  );
}

export default MembersComp;
