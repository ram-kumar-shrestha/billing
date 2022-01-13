import React from "react";
import { Link, Outlet } from "react-router-dom";

import "./users.css";

const index = () => {
  return (
    <>
      <section className="users-container">
        <Link className="link" to="/users/add-a-user">
          Add A User
        </Link>
        <Link className="link" to="/users/view-all-users">
          View All User
        </Link>
      </section>
      <div className="outlet-container">
        <Outlet />
      </div>
    </>
  );
};

export default index;
