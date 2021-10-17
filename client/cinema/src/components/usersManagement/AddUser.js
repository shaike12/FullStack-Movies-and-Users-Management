import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  ButtonGroup,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";

const AddUserComp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    city: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const addUser = async () => {
    try {
      let resp = await axios.post("http://localhost:4000/api/users", user);
      dispatch({ type: "ADD_user", payload: { id: resp._id, ...user } });
      history.push("/main/users_management");
    } catch (err) {
      console.log("Unable to Add User", err);
    }
  };

  return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { m: 12, width: "30ch" },
        display: "flex",
        flexDirection: "column",
        ml: 3,
        width: "400px",
        margin: "0 auto"
      }}
      noValidate
    >
      <FormGroup>
        <h2>Add User</h2>
        <TextField
          variant='standard'
          label='First Name:'
          value={user.first_name}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "20px" }}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
        />
        <TextField
          label='Last Name:'
          value={user.last_name}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "20px" }}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
        />
        <TextField
          label='Username:'
          value={user.username}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "20px" }}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <TextField
          label='Session Timeout:'
          value={user.session_timeout}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "20px" }}
          onChange={(e) =>
            setUser({ ...user, session_timeout: e.target.value })
          }
        />
        <TextField
          label='Created Date:'
          value={user.created_date}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "20px" }}
        />
        Permissions:
        <FormControlLabel control={<Checkbox />} label='View Subscriptions' />
        <FormControlLabel control={<Checkbox />} label='Create Subscriptions' />
        <FormControlLabel control={<Checkbox />} label='Update Subscriptions' />
        <FormControlLabel control={<Checkbox />} label='Delete Subscriptions' />
        <FormControlLabel control={<Checkbox />} label='View Movies' />
        <FormControlLabel control={<Checkbox />} label='Create Movies' />
        <FormControlLabel control={<Checkbox />} label='Update Movies' />
        <FormControlLabel control={<Checkbox />} label='Delete Movies' />
          </FormGroup>
        <ButtonGroup>
          <Button variant='contained' onClick={addUser}>
            Add
          </Button>
          <Button
            variant='contained'
            onClick={() => history.push("/main/users_management")}
          >
            Cancel
          </Button>
        </ButtonGroup>
    </Box>
  );
};

export default AddUserComp;
