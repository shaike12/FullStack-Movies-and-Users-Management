import React, { useState } from "react";
import { Container, Button } from "@material-ui/core";
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
      dispatch({ type: "ADD_member", payload: {id: resp._id, ...member} });
      history.push("/main/subscriptions");
    } catch (err) {
      console.log("Unable to Add Member", err);
    }
  };

  return (
    <Container>
      <h2>Add member</h2>
      <form>
        Name:{" "}
        <input
          type='text'
          onChange={(e) => setMember({ ...member, name: e.target.value })}
        />
        <br />
        Email:{" "}
        <input
          type='text'
          onChange={(e) => setMember({ ...member, email: e.target.value })}
        />
        <br />
        City:{" "}
        <input
          type='text'
          onChange={(e) => setMember({ ...member, city: e.target.value })}
        />
        <br />
       
        <Button onClick={addmember}>Add</Button>
        <Button onClick={() => history.push("/main/subscriptions")}>Cancel</Button>
      </form>
    </Container>
  );
};

export default AddMemberComp;
