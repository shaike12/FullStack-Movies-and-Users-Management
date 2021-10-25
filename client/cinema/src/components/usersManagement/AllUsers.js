import React, { useEffect, useState } from "react";
import { Container, LinearProgress } from "@mui/material";
import axios from "axios";
import UserComp from "./User";
import { useDispatch, useSelector } from "react-redux";

const AllusersComp = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchParams = {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("authUser")).token,
      },
    };
    let fetchData = async () => {
      try {
        let resp = await axios.get("http://localhost:4000/api/users", fetchParams);
        let allUsers = resp.data;
        // Check if Token Is Correct and Get All movies
        if (allUsers.auth) {
          console.log("your are not the login user");
        } else {
          dispatch({ type: "ADD_ALL_USERS", payload: allUsers });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h2>Users</h2>
      {isLoading ? (
        <LinearProgress />
      ) : (
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
      )}
    </Container>
  );
};

export default AllusersComp;
