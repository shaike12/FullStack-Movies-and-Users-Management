import "../App.css";
import { Link, useRouteMatch, Route, Switch } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import AllMembersComp from "../components/subscriptions/AllMembers";
import EditMemberComp from "../components/subscriptions/EditMember";
import AddMemberComp from "../components/subscriptions/AddMember";
import MemberPageComp from "../pages/MemberPage";

function MembersComp() {
  const { path } = useRouteMatch();

  return (
    <div className='App'>
      <Stack
        style={{ justifyContent: "center", margin: "20px 40px" }}
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
      >
        <Button variant='outlined'>
          <Link to={path}>All Members</Link>
        </Button>
        <Button variant='outlined'>
          <Link to={path + "/add_member"}>Add Member</Link>
        </Button>
      </Stack>
  

    
      <Switch>
        <Route exact path={path}>
          <AllMembersComp />
        </Route>
        <Route path={path + "/add_member"}>
          <AddMemberComp />
        </Route>
        <Route path={path + "/edit_member/:id"}>
          <EditMemberComp/>
        </Route>
        <Route path={path + "/member_page/:id"}>
          <MemberPageComp />
        </Route>
      
      </Switch>
    </div>
  );
}

export default MembersComp;
