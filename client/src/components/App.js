import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import LeftNavigation from "./nav-left";
import Header from "./header";
import Main from "./main";
import Login from "./login";
// import Forbidden from "./Forbidden";
import { fetchAuthUser } from "../actions";

const App = ({ authUser, fetchAuthUser }) => {
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("authId");
    if (token) return fetchAuthUser(id);

    return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderApp = !authUser.isAuth ? (
    <Routes>
      <Route path="/" index element={<Login />}></Route>
    </Routes>
  ) : (
    <div className="container">
      <LeftNavigation className="nav-left" />
      <Header className="header" />
      <Main className="main"></Main>
    </div>
  );
  return <BrowserRouter>{renderApp}</BrowserRouter>;
};

const mapStateToProps = (state) => {
  return { authUser: state.authUser };
};
export default connect(mapStateToProps, { fetchAuthUser })(App);
