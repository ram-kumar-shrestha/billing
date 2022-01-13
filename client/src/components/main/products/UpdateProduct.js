import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { useParams } from "react-router-dom";

import { fetchProducts, updateProduct } from "../../../actions";

const UpdateProductForm = (props) => {
  const { pristine, reset, submitting } = props;

  const { id } = useParams(); //current product id

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true); //start loading animation

    // validating rate
    if (isNaN(Number(props.productInfo.values.rate))) {
      setMessage(info("Rate must be a number", "#ca2525"));
    } else {
      props
        .updateProduct(id, {
          name: props.productInfo.values.name,
          rate: props.productInfo.values.rate,
          description: props.productInfo.values.description,
        })
        .then(() => {
          setLoading(false); //stop loading animation

          //to make sure all products are loaded in state for view all
          props.fetchProducts();

          // showing success info
          setMessage(
            info(
              ` You have updated "${props.productInfo.values.name}"`,
              "#038f59"
            )
          );
          setError("");
        })
        .catch((e) => {
          setLoading(false); //stop loading animation
          setError(
            ` ${props.productInfo.values.name} product is already present `
          );
          setMessage("");
        });
    }
  };

  return (
    <section className="form-container">
      <h1>Update a product</h1>

      <form onSubmit={handleSubmit}>
        {message}
        {error && <p className="error">{error}</p>}

        <div className="form-item">
          <label htmlFor="name">Name:</label>
          <Field name="name" component="input" type="text" required />
        </div>

        <div className="form-item">
          <label htmlFor="rate">Rate:</label>
          <Field name="rate" component="input" type="text" required />
        </div>

        <div className="form-item">
          <label htmlFor="description">Description:</label>
          <Field name="description" component="input" type="text" />
        </div>

        <button type="submit" className="btn btn-add">
          Update {loading && <span className="spinning-loader"></span>}
        </button>
        <button
          type="button"
          className="btn btn-clear"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear Values
        </button>
      </form>
    </section>
  );
};

const maptStateToProps = (state, ownProps) => {
  return {
    initialValues: {
      name: state.products.name,
      rate: state.products.rate,
      description: state.products.description,
    },
    productInfo: state.form.productInfo,
  };
};

export default connect(maptStateToProps, {
  fetchProducts,
  updateProduct,
})(
  reduxForm({
    form: "productInfo", // a unique identifier for this form
    enableReinitialize: true,
  })(UpdateProductForm)
);
