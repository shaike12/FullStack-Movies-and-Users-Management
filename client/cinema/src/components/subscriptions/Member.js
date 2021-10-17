import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import MoviesWatchedComp from './MoviesWatched'

const MemberComp = ({ member }) => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const deleteMember = async (memberID) => {
    await axios.delete("http://localhost:4000/api/members/" + memberID);
    dispatch({ type: "DELETE_MEMBER", payload: memberID });
  };

  return (
    <Container style={{ border: "1px solid black", width: "400px" }}>
      <h3>{member.name}</h3>
      <div>Email: {member.email} </div>
      <br />
      <div>City: {member.city} </div>
      <br />

      <button>
        <Link to={path + `/editMember/${member._id}`}>Edit</Link>
      </button>
      <button onClick={() => deleteMember(member._id)}>Delete</button>
      <MoviesWatchedComp id={member._id} />
    </Container>
  );
};

export default MemberComp;
