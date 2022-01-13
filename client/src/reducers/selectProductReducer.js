export const selectProductReducer = (state = [], action) => {
  // console.log(action);
  switch (action.type) {
    case "SELECT_ITEM":
      return [...state, action.payload];

    case "REFRESH_ITEM":
      return action.payload;

    case "DELETE_ITEM":
      return state.filter((item) => item.name !== action.payload.name);

    default:
      return state;
  }
};
