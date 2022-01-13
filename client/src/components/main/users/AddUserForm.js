import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { addUser } from "../../../actions";

const AddUserForm = (props) => {
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
    if (isNaN(Number(props.userInfo.values.phone))) {
      setMessage(info("Phone must be a number", "#ca2525"));
    } else if (
      props.userInfo.values.phone.length < 9 ||
      props.userInfo.values.phone.length > 10
    ) {
      setMessage(info("Phone must be a 9 or 10 digit number", "#ca2525"));
    } else {
      props
        .addUser({
          name: props.userInfo.values.name,
          phone: props.userInfo.values.phone,
          email: props.userInfo.values.email,
          password: props.userInfo.values.password,
        })
        .then(() => {
          // clearing input field
          reset();

          setLoading(false); //stop loading animation

          // showing success info
          setMessage(
            info(` You have added "${props.userInfo.values.name}"`, "#038f59")
          );
          setError("");
        })
        .catch((e) => {
          setLoading(false); //stop loading animation
          setError("Email is already taken");
          setMessage("");
        });
    }
  };

  return (
    <section className="form-container">
      <h1>Add a User</h1>

      <form onSubmit={handleSubmit}>
        {message}
        {error && <p className="error">{error}</p>}

        <div className="form-item">
          <label htmlFor="name">Name:</label>
          <Field name="name" component="input" type="text" required />
        </div>

        <div className="form-item">
          <label htmlFor="phone">Phone:</label>
          <Field name="phone" component="input" type="text" required />
        </div>

        <div className="form-item">
          <label htmlFor="email">Email:</label>
          <Field name="email" component="input" type="Email" required />
        </div>

        <div className="form-item">
          <label htmlFor="password">Password:</label>
          <Field name="password" component="input" type="password" required />
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
    userInfo: state.form.userInfo,
  };
};

export default connect(maptStateToProps, { addUser })(
  reduxForm({
    form: "userInfo", // a unique identifier for this form
  })(AddUserForm)
);
