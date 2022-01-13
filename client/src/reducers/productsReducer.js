export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return action.payload;

    case "FETCH_PRODUCT":
      return action.payload;

    case "DELETE_PRODUCT":
      return state.filter((item) => item._id !== action.payload._id); //this updates redux state which causes rerender

    default:
      return state;
  }
};
