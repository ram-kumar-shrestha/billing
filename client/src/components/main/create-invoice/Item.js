import React from "react";

const Item = ({ name, value }) => {
  return (
    <h4 className="items">
      {name} <span className="item-value">{value}</span>
    </h4>
  );
};

export default Item;
