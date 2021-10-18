const members = (state = [], action) => {
  switch (action.type) {
    case "ADD_ALL_MEMBERS":
      return action.payload;

    case "DELETE_MEMBER":
      return state.filter((member) => member._id !== action.payload);

    case "UPDATE_MEMBER":
      console.log(action.payload)
      return state.map((member) => {
        if (member._id === action.payload.member.id) {
          return action.payload.member;
        }
        return member;
      });

    case "ADD_MEMBER":
      let members = state;
      members.push(action.payload);
      return state;

    default:
      return state;
  }
};

export default members;
