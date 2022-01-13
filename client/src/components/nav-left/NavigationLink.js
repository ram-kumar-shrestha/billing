import React from "react";
import { Link } from "react-router-dom";

const NavigationLink = ({ path, name, icon = [] }) => {
  return (
    <Link
      className="link"
      to={path}
      style={{
        display: "flex",
      }}
    >
      <span style={{ paddingRight: "0.5rem" }}>{icon}</span>
      {name}
    </Link>
  );
};

export default NavigationLink;
