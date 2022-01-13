import React from "react";
import { Link, Outlet } from "react-router-dom";
import { connect } from "react-redux";

import "./products.css";
import { fetchProducts } from "../../../actions";

const index = ({ fetchProducts }) => {
  const clickHandler = (e) => {
    e.preventDefault();

    fetchProducts();
  };
  return (
    <>
      <section className="products-container">
        <Link className="link" to="/products/add-a-product">
          Add A Product
        </Link>
        <button
          onClick={(e) => clickHandler(e)}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "1.2rem",
            fontWeight: "normal",
          }}
        >
          <Link className="link" to="/products/view-all-product">
            View All Product
          </Link>
        </button>
      </section>
      <div className="outlet-container">
        <Outlet />
      </div>
    </>
  );
};

export default connect(null, { fetchProducts })(index);
