export const authReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_AUTH_USER":
      return action.payload;

    case "LOG_IN":
      return action.payload;

    case "LOG_OUT":
      return action.payload;

    default:
      return state;
  }
};
