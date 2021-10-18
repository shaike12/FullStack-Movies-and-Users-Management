import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import axios from "axios";
import MemberComp from "./Member";
import { useDispatch, useSelector } from "react-redux";

const AllMembersComp = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members);

  useEffect(() => {
    let fetchData = async () => {
      let resp = await axios.get("http://localhost:4000/api/members");
      dispatch({ type: "ADD_ALL_MEMBERS", payload: resp.data });
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h2>Members</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
        }}
      >
        {members.map((member) => {
          return <MemberComp key={member._id} member={member} />;
        })}
      </div>
    </Container>
  );
};

export default AllMembersComp;
