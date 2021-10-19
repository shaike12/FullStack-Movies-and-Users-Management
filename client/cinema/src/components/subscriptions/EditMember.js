import { Button, TextField, Container, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "axios";

const EditMemberComp = () => {
  const [member, setMember] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      let member = await axios.get("http://localhost:4000/api/members/" + id);
      setMember({ ...member.data });
    }
    fetchData();
  }, []);

  const updateMember = async () => {
    console.log(member);
    try {
      await axios.put("http://localhost:4000/api/members/" + id, member);
      dispatch({ type: "UPDATE_MEMBER", payload: { id, member } });
      history.push("/main/subscriptions");
    } catch (err) {
      console.log("Unable to Add Member", err);
    }
  };

  return (
    <Container>
      <Box
        component='form'
        sx={{
          "& .MuiTextField-root": { m: 2 },
        }}
        noValidate
        autoComplete='off'
        style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}
      >
        <h2>Edit Member</h2>
        <TextField
          label='Name:'
          fullWidth
          required
          value={member.name}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setMember({ ...member, name: e.target.value })}
        />
        <br />
        <TextField
          label='Email:'
          fullWidth
          required
          value={member.email}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setMember({ ...member, email: e.target.value })}
        />
        <br />
        <TextField
          label='City:'
          fullWidth
          required
          value={member.city}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setMember({ ...member, city: e.target.value })}
        />
        <br />
        <div
          style={{
            display: "flex",
            direction: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Button variant='contained' onClick={updateMember}>
            Update
          </Button>
          <Button
            variant='contained'
            onClick={() => history.push("/main/subscriptions")}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default EditMemberComp;
