const users = (state = [], action) => {
  switch (action.type) {
    case "ADD_ALL_USERS":
      return action.payload;

    case "DELETE_USER":
      return state.filter((user) => user._id !== action.payload);

    case "UPDATE_USER":
      return state.map((user) => {
        if (user._id === action.payload.id) {
          console.log(action.payload)
          return action.payload.user;
        }
        return user;
      });

    case "ADD_USER":
      let users = state;
      users.push(action.payload);
      return state;

    default:
      return state;
  }
};

export default users;
