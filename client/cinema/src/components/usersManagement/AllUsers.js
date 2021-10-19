import React, { useEffect } from "react";
import { Container } from "@mui/material";
import axios from "axios";
import UserComp from "./User";
import { useDispatch, useSelector } from "react-redux";

const AllusersComp = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    let fetchData = async () => {
      let resp = await axios.get("http://localhost:4000/api/users");
      dispatch({ type: "ADD_ALL_USERS", payload: resp.data });
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h2>Users</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "space-evenly",
        }}
      >
        {users.map((user, index) => {
          return <UserComp key={index} user={user} />;
        })}
      </div>
    </Container>
  );
};

export default AllusersComp;
