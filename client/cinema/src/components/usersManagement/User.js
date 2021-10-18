import { Container, Button } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const UserComp = ({ user }) => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();


  const deleteUser = async (userID) => {
    // Disable Delete Admin
    if (user.username === 'admin'){
      return null
    }
    await axios.delete("http://localhost:4000/api/users/" + userID);
    dispatch({ type: "DELETE_USER", payload: userID });
  };

  return (
    <Container style={{ border: "1px solid black", width: "400px" }}>
      <div>Name : {user.first_name + " " + user.last_name}</div>
      <div>Username : {user.username}</div>
      <div>Session Timeout : {user.session_timeout}</div>
      <div>Created Date : {user.created_date}</div>
      <div>Permissions : {user.permissions.join(', ')}</div>
   

      <Button variant="contained">
        <Link to={path + `/edit_user/${user._id}`}>Edit</Link>
      </Button>
      <Button variant="contained" onClick={() => deleteUser(user._id)}>Delete</Button>
      
    </Container>
  );
};

export default UserComp;
