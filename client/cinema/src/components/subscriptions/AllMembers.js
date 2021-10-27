import React, { useEffect, useState } from "react";
import { Container, LinearProgress } from "@mui/material";
import axios from "axios";
import MemberComp from "./Member";
import { useDispatch, useSelector } from "react-redux";

const AllMembersComp = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let fetchData = async () => {
      const fetchParams = {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("authUser")).token,
        },
      };

      try {
        let resp = await axios.get(
          "http://localhost:4000/api/members",
          fetchParams
        );

        if (resp.auth) {
          console.log("your are not the login user");
        } else {
          let allMembers = resp.data;
          setHasPermission(
            JSON.parse(localStorage.getItem("authUser")).user.permissions.some(
              (x) => x === "View Subscriptions"
            )
          );
          dispatch({ type: "ADD_ALL_MEMBERS", payload: allMembers });
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
      <h2>Members</h2>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          {hasPermission &&
            members.map((member) => {
              return <MemberComp key={member._id} member={member} />;
            })}
        </div>
      )}
    </Container>
  );
};

export default AllMembersComp;
