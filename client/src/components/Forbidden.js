import React from "react";
import { Link } from "react-router-dom";
const Forbidden = () => {
  return (
    <div
      style={{
        margin: "2rem",
        fontSize: "1.4rem",
      }}
    >
      <h1
        style={{
          fontSize: "1.8rem",
          color: "#000",
        }}
      >
        !403 error , You are not authorized
      </h1>
      <Link to="/">Authorize yourself</Link>
    </div>
  );
};

export default Forbidden;
