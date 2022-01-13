import api from "../apis/api";
import authHeader from "../services/authHeader";

/**
 *
 *  action related to product
 *
 */

// add a product to db
export const addProduct = (product) => async (dispatch, getState) => {
  try {
    const response = await api.post("/products", product, {
      headers: authHeader(),
    });

    dispatch({ type: "ADD_PRODUCT", payload: response.data });
  } catch (error) {
    throw new Error(error.reponse);
  }
};

// load all product from db
export const fetchProducts = () => async (dispatch, getState) => {
  try {
    const response = await api.get("/products", { headers: authHeader() });

    dispatch({ type: "FETCH_PRODUCTS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

// load a product from db
export const fetchProduct = (id) => async (dispatch, getState) => {
  try {
    const response = await api.get(`/products/${id}`, {
      headers: authHeader(),
    });

    dispatch({ type: "FETCH_PRODUCT", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

// update a product
export const updateProduct = (id, product) => async (dispatch, getState) => {
  try {
    const response = await api.patch(`/products/${id}`, product, {
      headers: authHeader(),
    });

    dispatch({ type: "UPDATE_PRODUCT", payload: response.data });
  } catch (error) {
    throw new Error(error.reponse);
  }
};

// delete a product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    const response = await api.delete(`/products/${id}`, {
      headers: authHeader(),
    });

    dispatch({ type: "DELETE_PRODUCT", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 *  action related to users
 *
 */

// add a user to db
export const addUser = (user) => async (dispatch, getState) => {
  try {
    const response = await api.post("/users", user, { headers: authHeader() });

    dispatch({ type: "ADD_USER", payload: response.data });
  } catch (error) {
    throw new Error(error.reponse);
  }
};

// load all user from db
export const fetchUsers = () => async (dispatch, getState) => {
  try {
    const response = await api.get("/users", { headers: authHeader() });

    dispatch({ type: "FETCH_USERS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

// load a user from db
export const fetchUser = (id) => async (dispatch, getState) => {
  try {
    const response = await api.get(`/users/${id}`, { headers: authHeader() });

    dispatch({ type: "FETCH_USER", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

// load authenticated user from db
export const fetchAuthUser = (id) => async (dispatch, getState) => {
  try {
    const response = await api.get(`/users/${id}`, { headers: authHeader() });

    dispatch({
      type: "FETCH_AUTH_USER",
      payload: { user: response.data, isAuth: true },
    });
  } catch (error) {
    console.log(error);
  }
};

// update a user
export const updateUser = (id, user) => async (dispatch, getState) => {
  try {
    const response = await api.patch(`/users/${id}`, user, {
      headers: authHeader(),
    });
    dispatch({ type: "UPDATE_USER", payload: response.data });
  } catch (error) {
    throw new Error(error.reponse);
  }
};

// delete a user
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    const response = await api.delete(`/users/${id}`, {
      headers: authHeader(),
    });

    dispatch({ type: "DELETE_USER", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

// create history
export const createHistory = (history) => async (dispatch) => {
  try {
    const response = await api.post("/history", history, {
      headers: authHeader(),
    });

    dispatch({ type: "ADD_Histroy", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

// fetch all histories
export const fetchHistories = () => async (dispatch) => {
  try {
    const response = await api.get("/history", { headers: authHeader() });

    dispatch({
      type: "FETCH_HISTORIES",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// fetch a history
export const fetchHistory = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/history/${id}`, { headers: authHeader() });

    dispatch({
      type: "FETCH_HISTORY",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// delete a history
export const deleteHistory = (id) => async (dispatch, getState) => {
  try {
    const response = await api.delete(`/history/${id}`, {
      headers: authHeader(),
    });

    dispatch({ type: "DELETE_HISTORY", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

// login
export const logIn = (user) => async (dispatch) => {
  try {
    const response = await api.post("/users/login", user);

    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("authId", response.data.user._id);

    dispatch({
      type: "LOG_IN",
      payload: { ...response.data, isAuth: true },
    });
  } catch (error) {
    throw new Error(error.response);
  }
};

// logout
export const logOut = () => async (dispatch) => {
  try {
    console.log(authHeader());
    const response = await api.post("/users/logout", null, {
      headers: authHeader(),
    });
    console.log(response);
    if (response.status === 200) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authId");
    } //only remove token when user is logged out

    dispatch({
      type: "LOG_OUT",
      payload: { isAuth: false },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 *  action related to client
 *
 */
export const addClient = (client) => {
  return {
    type: "ADD_CLIENT",
    payload: client,
  };
};

// to prevent the loss of selectedItem while editing clientInfo
export const editClient = (client) => {
  return {
    type: "EDIT_CLIENT",
    payload: { ...client, isEditClient: true },
  };
};

export const selectItem = (item) => {
  return {
    type: "SELECT_ITEM",
    payload: item,
  };
};

export const refreshItem = (item) => {
  return {
    type: "REFRESH_ITEM",
    payload: item,
  };
};

export const deleteItem = (item) => {
  return {
    type: "DELETE_ITEM",
    payload: item,
  };
};
