import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userActions } from '../../_actions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    const { dispatch } = this.props;
    dispatch(userActions.logout());

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { email, password } = this.state;
    if (loggingIn) {
      return (
        <div className="container-fluid font-futura">
          <div className="outer login-background">
            <div className="middle login-transparent">
              <div className="loader no-flick" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <div className="outer login-background">
          <div className="middle login-transparent">
            <div className="login-elements">
              <i className="far fa-paper-plane logo-plane" />
              &nbsp;eAHM
            </div>
            <form onSubmit={this.handleSubmit}>
              <div><input className="login-input" type="text" placeholder="Email" name="email" value={email} onChange={this.handleChange} /></div>
              <div><input className="login-input" type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} /></div>
              <button type="submit" className="login-button">Sign In</button>
            </form>
            <div className="login-hr"><hr /></div>
            <Link to="/register" className="login-create-account">Create an account</Link>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool,
};

LoginPage.defaultProps = {
  loggingIn: false,
};

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn,
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
