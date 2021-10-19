import { Container, Button } from "@mui/material";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const UserComp = ({ user }) => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const deleteUser = async (userID) => {
    // Disable Delete Admin
    if (user.username === "admin") {
      return null;
    }
    await axios.delete("http://localhost:4000/api/users/" + userID);
    dispatch({ type: "DELETE_USER", payload: userID });
  };

  return (
    <Container
      style={{ border: "1px solid black", width: "400px", padding: "10px" }}
    >
      <p>Name : {user.first_name + " " + user.last_name}</p>
      <p>Username : {user.username}</p>
      <p>Session Timeout : {user.session_timeout}</p>
      <p>Created Date : {user.created_date}</p>
      <p>Permissions : <br/>{user.permissions.length !== 0 ? user.permissions.join(', ') : "Member Doesn't Permissions"}</p>

      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button variant='contained'>
          <Link className='edit' to={path + `/edit_user/${user._id}`}>
            Edit
          </Link>
        </Button>
        <Button variant='outlined' onClick={() => deleteUser(user._id)}>
          Delete
        </Button>
      </div>
    </Container>
  );
};

export default UserComp;
