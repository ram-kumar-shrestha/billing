export const historyReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_HISTORIES":
      return action.payload;

    case "FETCH_HISTORY":
      return action.payload;

    case "DELETE_HISTORY":
      return state.filter((item) => item._id !== action.payload._id); //this updates redux state which causes rerender
    default:
      return state;
  }
};
