import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { useNavigate } from "react-router-dom";

import { addClient, fetchProducts, refreshItem } from "../../../actions";
import "./create-invoice.css";

const InvoiceForm = (props) => {
  const navigate = useNavigate();

  // only refresh item if the create invoice link is directly clicked
  useEffect(() => {
    if (!props.client.isEditClient) props.refreshItem([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { pristine, reset, submitting } = props;

  // message info
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // phone validation
    if (
      props.invoice.values.phone &&
      isNaN(Number(props.invoice.values.phone))
    ) {
      setMessage(info("Phone must be a number", "#ca2525"));
    } else if (
      props.invoice.values.phone &&
      (props.invoice.values.phone.length < 9 ||
        props.invoice.values.phone.length > 10)
    ) {
      setMessage(info("Phone must be a 9 or 10 digit number", "#ca2525"));
    } else {
      props.addClient({
        name: props.invoice.values.name,
        phone: props.invoice.values.phone,
        organization: props.invoice.values.organization,
      });

      // clearing all fields
      reset();

      // load all products if not fetched yet
      if (!props.products) props.fetchProducts();

      // redirecting to select products
      navigate("/create-an-invoice/select-product");
    }
  };

  return (
    <section className="form-container outlet-container">
      <h1>
        {props.client.isEditClient ? "Edit Client's Info" : "Add Client's Info"}
      </h1>

      <form onSubmit={handleSubmit}>
        {message}
        <div className="form-item">
          <label htmlFor="name">Client's Name:</label>
          <Field name="name" component="input" type="text" required />
        </div>

        <div className="form-item">
          <label htmlFor="phone">Phone:</label>
          <Field name="phone" component="input" type="text" />
        </div>

        <div className="form-item">
          <label htmlFor="organization">Organization:</label>
          <Field name="organization" component="input" type="text" />
        </div>

        <button
          type="submit"
          disabled={!props.client.isEditClient ? pristine || submitting : false}
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
      </form>
    </section>
  );
};

const maptStateToProps = (state) => {
  return {
    initialValues: {
      name: state.client && state.client.isEditClient ? state.client.name : "", //provide the value for edit form
      phone:
        state.client && state.client.isEditClient ? state.client.phone : "", //provide the value for edit form
      organization:
        state.client && state.client.isEditClient
          ? state.client.organization
          : "", //provide the value for edit form
    },
    client: state.client,
    invoice: state.form.invoice,
  };
};

export default connect(maptStateToProps, {
  addClient,
  fetchProducts,
  refreshItem,
})(
  reduxForm({
    form: "invoice", // a unique identifier for this form
  })(InvoiceForm)
);
