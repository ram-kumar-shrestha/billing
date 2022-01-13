import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";

import { selectItem, editClient, deleteItem } from "../../../actions";
import "./create-invoice.css";

const ProductItemForm = (props) => {
  const { pristine, reset, submitting } = props;

  const selectedItems = props.selectedProducts.map((product, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{product.name}</td>
        <td>{product.quantity}</td>
        {/* <td>
          <Link className="link edit" to="/edit:id">
            Edit
          </Link>
        </td> */}
        <td>
          <Link
            className="link edit"
            to="/create-an-invoice/select-product"
            onClick={() => props.deleteItem(product)}
          >
            Delete
          </Link>
        </td>
      </tr>
    );
  });

  const info = (message, bgColor) => {
    return (
      <h3
        style={{
          background: bgColor,
          color: "#fff",
          marginBottom: "0.5rem",
          padding: "0.5rem",
        }}
      >
        {message}
      </h3>
    );
  };

  const [message, setMessage] = useState("");

  const options = props.products.map((product, index) => {
    return (
      <option key={index} name={product.name} value={product.name}>
        {product.name}
      </option>
    );
  });

  const handleProductSubmit = (e) => {
    e.preventDefault();

    // quantity and name   validation
    if (
      props.items.values.quantity &&
      isNaN(Number(props.items.values.quantity))
    ) {
      setMessage(info("Quantity must be a number", "#ca2525"));
    } else if (props.products.length === 0) {
      setMessage(
        <Link
          className="link item-3"
          style={{ width: "30%" }}
          to="/products/add-a-product"
        >
          Add a product
        </Link>
      );
    } else if (props.items.values.name === undefined) {
      setMessage(info("Select a product first", "#ca2525"));
    } else {
      props.selectItem({
        name: props.items.values.name,
        quantity: props.items.values.quantity,
      });

      // clearing the console

      reset();

      // showing success message
      setMessage(
        <div>
          {info(`You have added ${props.items.values.name}`, "#038f59")}
        </div>
      );
    }
  };

  return (
    <section className="form-container outlet-container">
      <h1>Select Product Items</h1>

      <h3
        style={{
          background: "#43bb4d",
          color: "#ffff",
          width: "30%",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >{`Invoice for ${props.client.name}`}</h3>

      <form onSubmit={handleProductSubmit}>
        {message}
        <div className="form-item">
          <label htmlFor="quantity">Quantity:</label>
          <Field name="quantity" component="input" type="text" required />
        </div>

        <div className="form-item">
          <label htmlFor="name">Product's Name:</label>
          <div className="form-item multiple-choice">
            {/* <Field name="name" component="select">
              {options}
            </Field> */}

            {/* autosuggestions */}
            <Field
              name="name"
              component="input"
              list="db-products"
              style={{ fontSize: "0.8rem", padding: "0.5em 1rem" }}
            ></Field>

            <datalist id="db-products">{options}</datalist>
          </div>
        </div>

        <button
          type="submit"
          disabled={pristine || submitting}
          className="btn btn-add"
        >
          Add
        </button>
        <button
          type="button"
          className="btn btn-clear"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear Values
        </button>

        {/* Btn or link to edit client if necessary */}
        <Link
          className="btn btn-back"
          to="/create-an-invoice/invoice-form"
          onClick={() => props.editClient(props.client)}
        >
          Edit Client Info
        </Link>

        {/* Btn or link to see invoice */}
        <Link className="btn btn-invoice" to="/create-an-invoice/show-invoice">
          Show the invoice
        </Link>
      </form>

      <div className="selected products">
        {props.selectedProducts.length !== 0 ? (
          <table>
            <thead>
              <tr>
                <th>SN</th>
                <th>Product Name</th>
                <th>Quantity</th>
                {/* <th>Edit</th> */}
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>{selectedItems}</tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

const maptStateToProps = (state) => {
  return {
    products: state.products,
    items: state.form.productItems,
    selectedProducts: state.selectedProducts,
    client: state.client,
  };
};

export default connect(maptStateToProps, {
  selectItem,
  editClient,
  deleteItem,
})(
  reduxForm({
    form: "productItems", // a unique identifier for this form
  })(ProductItemForm)
);
