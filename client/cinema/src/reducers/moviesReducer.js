const movies = (state = [], action) => {
  switch (action.type) {
    case "ADD_ALL_MOVIES":
      return action.payload;

    case "DELETE_MOVIE":
      return state.filter((movie) => movie._id !== action.payload);

    case "UPDATE_MOVIE":
      return state.map((movie) => {
        if (movie._id === action.payload.id) {
          return action.payload.movie;
        }
        return movie;
      });

    case "ADD_MOVIE":
      let movies = state;
      movies.push(action.payload);
      return state;

    default:
      return state;
  }
};

export default movies;
