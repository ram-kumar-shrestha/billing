export const clientReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_CLIENT":
      return action.payload;

    case "EDIT_CLIENT":
      return action.payload;

    default:
      return state;
  }
};
