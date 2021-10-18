import React from "react";
import { TextField } from "@material-ui/core";

const SearchMovieField = ({setSearch, search}) => {

  return (
    <div>
      <br />
      <TextField
        variant='standard'
        value={search}
        style={{ marginBottom: "20px" }}
        onChange={(e) => setSearch(e.target.value)}
        label="Search..."
      />
    </div>
  );
};

export default SearchMovieField;
