import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useHistory } from "react-router";
import axios from "axios";

const initilizePermissions = [
  { value: "View Subscriptions", isChecked: false },
  { value: "Create Subscriptions", isChecked: false },
  { value: "Delete Subscriptions", isChecked: false },
  { value: "Update Subscriptions", isChecked: false },
  { value: "View Movies", isChecked: false },
  { value: "Create Movies", isChecked: false },
  { value: "Delete Movies", isChecked: false },
  { value: "Update Movies", isChecked: false },
];

const AddUserComp = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    session_timeout: "",
    permissions: initilizePermissions,
  });

  const addUser = async () => {
    const fetchParams = {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("authUser")).token,
      },
    };
    try {
      let permissions = user.permissions
        .filter((x) => x.isChecked)
        .map((x) => x.value);

      await axios.post(
        "http://localhost:4000/api/users",
        {
          ...user,
          permissions,
        },
        fetchParams
      );
      history.push("/main/users_management");
    } catch (err) {
      console.log("Unable to Add User", err);
    }
  };

  // Handle All Checkboxs
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
        "& .MuiTextField-root": { m: 1 },
      }}
      style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}
    >
      <FormGroup>
        <h2>Add User</h2>
        <TextField
          label='First Name:'
          value={user.first_name}
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
        />
        <TextField
          label='Last Name:'
          value={user.last_name}
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
        />
        <TextField
          label='Username:'
          value={user.username}
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <TextField
          label='Session Timeout:'
          value={user.session_timeout}
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) =>
            setUser({ ...user, session_timeout: e.target.value })
          }
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
        <Button variant='contained' onClick={addUser}>
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

export default AddUserComp;
