import { Button, TextField, Container, Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from 'axios'

const EditMemberComp = () => {
  const [member, setMember] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      let member = await axios.get("http://localhost:4000/api/members/" + id );
      setMember({...member.data});
    }
    fetchData();
  }, [id]);

  const updateMember = async () => {
    try {
      await axios.put("http://localhost:4000/api/members/" + id, member );
      dispatch({ type: "UPDATE_MEMBER", payload: member });
      history.push("/main/subscriptions");
    } catch (err) {
      console.log("Unable to Add member", err);
    }
  };

  return (
    <Container>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 12, width: '30ch' },
      }}
      noValidate
      >
        <h2>Edit Member</h2>
        <TextField
        variant="standard"
          label='Name:'
          value={member.name}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setMember({ ...member, name: e.target.value })}
        />
        <br />
        <TextField
          label='Email:'
          value={member.email}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setMember({ ...member, email: e.target.value })}
        />
        <br />
        <TextField
          label='City:'
          value={member.city}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setMember({ ...member, city: e.target.value })}
        />
        <br />
        
        <Button variant="contained" onClick={updateMember}>Update</Button>
        <Button variant="contained" onClick={() => history.push("/main/subscriptions")}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default EditMemberComp;
