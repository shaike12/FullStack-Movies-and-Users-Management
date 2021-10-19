import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";

const AddMemberComp = () => {
  const [member, setMember] = useState({
    name: "",
    email: "",
    city: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const addmember = async () => {
    try {
      let resp = await axios.post("http://localhost:4000/api/members", member);
      dispatch({ type: "ADD_member", payload: { id: resp._id, ...member } });
      history.push("/main/subscriptions");
    } catch (err) {
      console.log("Unable to Add Member", err);
    }
  };

  return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete='off'
      style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}
    >
      <h2>Add member</h2>
      <TextField
        label='Name:'
        required
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginBottom: "20px" }}
        onChange={(e) => setMember({ ...member, name: e.target.value })}
      />
      <br />
      <TextField
        label='Email:'
        required
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginBottom: "20px" }}
        onChange={(e) => setMember({ ...member, email: e.target.value })}
      />
      <br />
      <TextField
        label='City:'
        required
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginBottom: "20px" }}
        onChange={(e) => setMember({ ...member, city: e.target.value })}
      />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <Button variant='contained' onClick={addmember}>
          Add
        </Button>
        <Button
          variant='contained'
          onClick={() => history.push("/main/subscriptions")}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default AddMemberComp;
