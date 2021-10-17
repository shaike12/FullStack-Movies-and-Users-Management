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
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "axios";

const EditUserComp = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      let user = await axios.get("http://localhost:4000/api/users/" + id);
      setUser({ ...user.data });
    }
    fetchData();
  }, [id]);

  const updateUser = async () => {
    try {
      await axios.put("http://localhost:4000/api/users/" + id, user);
      dispatch({ type: "UPDATE_USER", payload: user });
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
        <h2>Edit User</h2>
        <TextField
          variant='standard'
          label='First Name:'
          value={user.first_name}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "20px"}}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
        />
        <TextField
          label='Last Name:'
          value={user.last_name}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "20px"}}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
        />
        <TextField
          label='Username:'
          value={user.username}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "20px"}}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <TextField
          label='Session Timeout:'
          value={user.session_timeout}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "20px"}}
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
          style={{ marginBottom: "20px"}}
        />
        Permissions:
        <FormControlLabel control={<Checkbox />} label="View Subscriptions" />
        <FormControlLabel control={<Checkbox />} label="Create Subscriptions" />
        <FormControlLabel control={<Checkbox />} label="Update  Subscriptions" />
        <FormControlLabel control={<Checkbox />} label="Delete Subscriptions" />
        <FormControlLabel control={<Checkbox />} label="View Movies" />
        <FormControlLabel control={<Checkbox />} label="Create Movies" />
        <FormControlLabel control={<Checkbox />} label="Update Movies" />
        <FormControlLabel control={<Checkbox />} label="Delete Movies" />
      </FormGroup>
      <ButtonGroup>
        <Button variant='contained' onClick={updateUser}>
          Update
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

export default EditUserComp;
