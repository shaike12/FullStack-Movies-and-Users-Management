import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import axios from "axios";
import UserComp from "./User";
import { useDispatch, useSelector } from "react-redux";

const AllusersComp = () => {
  const [listUsers, setListUsers] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    let fetchData = async () => {
      let resp = await axios.get("http://localhost:4000/api/users");
      dispatch({ type: "ADD_ALL_USERS", payload: resp.data });
      setListUsers(resp.data);
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
          justifyContent: "center",
        }}
      >
        {users.map((user) => {
          return <UserComp key={user._id} user={user} />;
        })}
      </div>
    </Container>
  );
};

export default AllusersComp;
