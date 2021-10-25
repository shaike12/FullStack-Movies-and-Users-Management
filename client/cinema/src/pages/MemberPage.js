import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MemberPageComp = () => {
  const { id } = useParams();
  const [member, setMember] = useState({});

  useEffect(() => {
    const fetchParams = {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("authUser")).token,
      },
    };
    const fetchData = async () => {
      let resp = await axios.get(
        "http://localhost:4000/api/members/" + id,
        fetchParams
      );
      setMember(resp.data);
    };
    fetchData();
  }, [id]);
  return (
    <div>
      <h2>Member Page</h2>
      <p>Name: {member.name}</p>
      <p>Email: {member.email}</p>
      <p>City: {member.city}</p>
    </div>
  );
};

export default MemberPageComp;
