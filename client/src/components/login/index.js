import React, { useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { useNavigate } from "react-router-dom";

import { logIn } from "../../actions";

import "./login.css";

const Index = (props) => {
  const navigate = useNavigate();

  const { pristine, submitting } = props;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); //start loading animation
    props
      .logIn({
        email: props.info.values.email,
        password: props.info.values.password,
      })
      .then((response) => {
        navigate("/dashboard");
        setLoading(false); //stop loading animation
      })
      .catch((e) => {
        setLoading(false); //stop loading animation
        setError("User Credentials do not match");
      });
  };
  return (
    <section
      className="login-container"
      style={{ background: 'url("/images/billing-software.png")' }}
    >
      <div className="slogan">
        <h1>Enjoy The Billing Application</h1>
        <h3>Make Your Bussiness Efficient</h3>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        {/* {message} */}
        <div className="form-item">
          <label htmlFor="email">Email:</label>
          <Field name="email" component="input" type="email" required />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password:</label>
          <Field name="password" component="input" type="password" required />
        </div>

        {error && <p className="error"> {error}</p>}

        <button
          type="submit"
          disabled={pristine || submitting}
          className="btn btn-login"
        >
          Log In{" "}
          {loading && (
            <span
              style={{ borderLeftColor: "rgb(39, 154, 226)" }}
              className="spinning-loader"
            ></span>
          )}
        </button>
      </form>
    </section>
  );
};

const mapStateToProps = (state) => {
  return { info: state.form.logInInfo };
};

export default connect(mapStateToProps, { logIn })(
  reduxForm({
    form: "logInInfo",
  })(Index)
);
