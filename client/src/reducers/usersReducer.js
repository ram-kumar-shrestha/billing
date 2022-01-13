export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.payload;

    case "FETCH_USER":
      return action.payload;

    case "DELETE_USER":
      return state.filter((item) => item._id !== action.payload._id); //this updates redux state which causes rerender

    default:
      return state;
  }
};
