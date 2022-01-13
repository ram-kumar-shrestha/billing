import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import { productsReducer } from "./productsReducer";
import { selectProductReducer } from "./selectProductReducer";
import { usersReducer } from "./usersReducer";
import { clientReducer } from "./clientReducer";
import { historyReducer } from "./historyReducer";
import { authReducer } from "./authReducer";

export default combineReducers({
  form: formReducer,
  products: productsReducer,
  users: usersReducer,
  selectedProducts: selectProductReducer,
  client: clientReducer,
  history: historyReducer,
  authUser: authReducer,
});
