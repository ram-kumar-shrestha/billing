import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { connect } from "react-redux";

import "./header.css";
import { logOut } from "../../actions";

const Index = ({ authUser, logOut }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogOut = (e) => {
    e.preventDefault();

    setLoading(true); //start loading animation

    logOut();
    navigate("/");
  };

  return (
    <header>
      <section className="top-header">
        <Link className="user" to="/profile">
          {authUser.user.name}
        </Link>
        <button
          className="btn-log__out"
          style={{ display: "flex", justifyContent: "center" }}
          onClick={(e) => handleLogOut(e)}
        >
          Log out
          <span style={{ paddingLeft: "0.5rem" }}>
            <AiOutlineLogout />
          </span>
          {loading && (
            <span
              style={{
                borderLeftColor: "rgb(21 154 239)",
                top: "0",
                left: "0.5rem",
              }}
              className="spinning-loader"
            ></span>
          )}
        </button>
      </section>

      <hr />

      <section className="bottom-header">
        <Link className="bottom-header__nav item-1" to="users/add-a-user">
          Add a User
        </Link>
        {/* <Link className="bottom-header__nav item-2" to="/delete-a-user">
          History
        </Link> */}
        <Link
          className="bottom-header__nav item-3"
          to="/create-an-invoice/invoice-form"
        >
          Create an Invoice
        </Link>
      </section>
    </header>
  );
};

const mapStateToProps = (state) => {
  return { authUser: state.authUser };
};

export default connect(mapStateToProps, { logOut })(Index);
