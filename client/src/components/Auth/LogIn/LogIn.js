import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from "../../../actions";
import LogInMetadata from "../../Helmets/LogInMetadata";
import LogInForm from "../LogInForm/LogInForm";

class LogIn extends React.Component {
  onSubmit = (formValues) => {
    this.props.logIn(formValues);
  };

  renderErrors = () => {
    if (this.props.error === {}) {
      return null;
    } else {
      return this.props.error.message;
    }
  };

  render() {
    return (
      <div className="component-login" data-test="component-login">
        <LogInMetadata />
        <LogInForm onSubmit={this.onSubmit} />
        <p className="error-message">{this.renderErrors()}</p>
        <p>
          Don't have an account? <Link to="/users/signup">Sign Up</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { error: state.error, userId: state.auth.userId };
};

export default connect(mapStateToProps, { logIn })(LogIn);
