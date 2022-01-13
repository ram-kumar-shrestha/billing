import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { addProduct } from "../../../actions";

const AddProductForm = (props) => {
  const { pristine, reset, submitting } = props;

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
        .addProduct({
          name: props.productInfo.values.name,
          rate: props.productInfo.values.rate,
          description: props.productInfo.values.description,
        })
        .then(() => {
          // clearing input field
          reset();

          setLoading(false); //stop loading animation
          // showing success info
          setMessage(
            info(
              ` You have added "${props.productInfo.values.name}"`,
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
      <h1>Add a product</h1>

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

        <button
          type="submit"
          disabled={pristine || submitting}
          className="btn btn-add"
        >
          Add {loading && <span className="spinning-loader"></span>}
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

const maptStateToProps = (state) => {
  return {
    productInfo: state.form.productInfo,
  };
};

export default connect(maptStateToProps, { addProduct })(
  reduxForm({
    form: "productInfo", // a unique identifier for this form
  })(AddProductForm)
);
