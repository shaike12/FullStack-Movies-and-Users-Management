import {
  Button,
  TextField,
  ButtonGroup,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "axios";

const initilizePermissions = [
  { value: "View Subscriptions", isChecked: false },
  { value: "Create Subscriptions", isChecked: false },
  { value: "Delete Subscriptions", isChecked: false },
  { value: "Update Subscriptions", isChecked: false },
  { value: "View Movies", isChecked: false },
  { value: "Delete Movies", isChecked: false },
  { value: "Update Movies", isChecked: false },
  { value: "Create Movies", isChecked: false },
];

const EditUserComp = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    session_timeout: "",
    created_date: "",
    permissions: [],
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // Add 'isChecked' Key To User Data
    async function fetchData() {
      let user = await axios.get("http://localhost:4000/api/users/" + id);
      let permis = initilizePermissions.map((x) => {
        if (user.data.permissions.some((p) => p === x.value)) {
          x.isChecked = true;
          return x;
        }
        return x;
      });
      setUser({ ...user.data, permissions: permis });
    }
    fetchData();
  }, [id]);

  const updateUser = async () => {
    // Clean Up 'isChecked' Key (Boolian) From User Data
    let obj = user;
    obj.permissions = obj.permissions
      .filter((p) => p.isChecked)
      .map((p) => p.value);

    try {
      console.log(obj);
      await axios.put("http://localhost:4000/api/users/" + id, obj);
      dispatch({ type: "UPDATE_USER", payload: obj });
      history.push("/main/users_management");
    } catch (err) {
      console.log("Unable to Add User", err);
    }
  };

  const handleCheckChildElement = (checkBoxId) => {
    let newPermissions = user.permissions;
    let currentCheckBox = user.permissions[checkBoxId];

    currentCheckBox.isChecked = !currentCheckBox.isChecked;

    if (
      currentCheckBox.value === "Create Subscriptions" ||
      currentCheckBox.value === "Update Subscriptions" ||
      currentCheckBox.value === "Delete Subscriptions"
    ) {
      newPermissions[0].isChecked = true;
    }
    if (
      currentCheckBox.value === "Create Movies" ||
      currentCheckBox.value === "Update Movies" ||
      currentCheckBox.value === "Delete Movies"
    ) {
      newPermissions[4].isChecked = true;
    }
    if (
      currentCheckBox.value === "View Subscriptions" &&
      !currentCheckBox.isChecked
    ) {
      console.log(newPermissions);
      newPermissions[1].isChecked = false;
      newPermissions[2].isChecked = false;
      newPermissions[3].isChecked = false;
    }

    if (currentCheckBox.value === "View Movies" && !currentCheckBox.isChecked) {
      newPermissions[5].isChecked = false;
      newPermissions[6].isChecked = false;
      newPermissions[7].isChecked = false;
    }

    setUser({ ...user, permissions: [...newPermissions] });
  };

  return (
    <Box
      component='form'
        sx={{
          "& .MuiTextField-root": { m: 2},
        
        }}
        noValidate
        autoComplete='off'
        style={{textAlign: 'center',maxWidth:"600px", margin:"0 auto"}}
    >
      <FormGroup>
        <h2>Edit User</h2>
        <TextField
          label='First Name:'
          value={user.first_name}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "20px" }}
          fullWidth
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
        />
        <TextField
          label='Last Name:'
          value={user.last_name}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "20px" }}
          fullWidth
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
        />
        <TextField
          label='Username:'
          value={user.username}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "20px" }}
          fullWidth
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <TextField
          label='Session Timeout:'
          value={user.session_timeout}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "20px" }}
          fullWidth
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
          fullWidth
          disabled
        />
        <h3>Permissions:</h3>
        {user.permissions.map((permission, index) => {
          return (
            <div key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={permission.value}
                    onChange={() => handleCheckChildElement(index)}
                  />
                }
                label={permission.value}
                checked={permission.isChecked}
              />
            </div>
          );
        })}
      </FormGroup>
      
        <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <Button variant='contained' onClick={updateUser}>
          Add
        </Button>
        <Button
          variant='contained'
          onClick={() => history.push("/main/users_management")}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default EditUserComp;
