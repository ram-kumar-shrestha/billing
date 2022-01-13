import React from "react";
import { connect } from "react-redux";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

import { deleteProduct, fetchProducts, fetchProduct } from "../../../actions";

const ViewAllProducts = (props) => {
  const updateClickHandler = (id) => {
    props.fetchProduct(id); //to get initial state for update form
  };

  const deleteClickHandler = (id) => {
    props.deleteProduct(id);
  };

  // redering loading
  const loading = () => {
    props.fetchProducts();
    return <div>Loading... </div>;
  };

  // fetch products if the products state is either empty array or not an array at all
  if (
    !(Object.prototype.toString.call(props.products) === "[object Array]") ||
    props.products.length === 0
  ) {
    return loading();
  }

  const productsList = props.products.map((product, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{product.name}</td>
        <td>{product.rate}</td>
        <td>{product.description}</td>
        <td>
          <Link
            className="link edit"
            to={`/products/update/${product._id}`}
            onClick={(e) => updateClickHandler(product._id)}
          >
            {<AiTwotoneEdit />}
          </Link>
        </td>
        <td>
          <Link
            className="link delete"
            to={`/products/delete/${product._id}`}
            onClick={(e) => deleteClickHandler(product._id)}
          >
            {<AiFillDelete />}
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <section className="all-products">
      <h1 className="title">Products</h1>
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>Product Name</th>
            <th>Rate</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>{productsList}</tbody>
      </table>
    </section>
  );
};

const mapToStateToProps = (state) => {
  return { products: state.products };
};
export default connect(mapToStateToProps, {
  fetchProducts,
  deleteProduct,
  fetchProduct,
})(ViewAllProducts);
