import "../App.css";
import { Link, useRouteMatch, Route, Switch } from "react-router-dom";
import { Button, Container } from "@material-ui/core";
import AllMembersComp from "../components/subscriptions/AllMembers";
import EditMemberComp from "../components/subscriptions/EditMember";
import AddMemberComp from "../components/subscriptions/AddMember";

function MembersComp() {
  const { path } = useRouteMatch();

  return (
    <div className='App'>
      <Button variant='contained'>
        <Link to={path}>All Members</Link>
      </Button>

      <Button variant='contained'>
        <Link to={path + "/add_member"}>Add Member</Link>
      </Button>
      <Switch>
        <Route exact path={path}>
          <AllMembersComp />
        </Route>
        <Route path={path + "/add_member"}>
          <AddMemberComp />
        </Route>
        <Route path={path + "/editMember/:id"}>
          <EditMemberComp/>
        </Route>
      </Switch>
    </div>
  );
}

export default MembersComp;
