const auth = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload

    case "LOGOUT":
      return null

    default:
      return null;
  }
};

export default auth;
