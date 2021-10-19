import React from "react";
import { TextField } from "@mui/material";

const SearchMovieField = ({setSearch, search}) => {

  return (
    <div>
      <br />
      <TextField
      type="search"
        value={search}
        style={{ marginBottom: "20px" }}
        onChange={(e) => setSearch(e.target.value)}
        label="Search..."
      />
    </div>
  );
};

export default SearchMovieField;
