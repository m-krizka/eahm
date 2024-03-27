import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions/user.actions';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        regToken: '',
        password1: '',
        password2: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.email && user.regToken && user.password1 && user.password2) {
      dispatch(userActions.register(user));
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="outer login-background">
          <div className="middle login-transparent">
            <div className="login-elements">
              <i className="far fa-paper-plane logo-plane" />
              &nbsp;eAHM
            </div>
            <form onSubmit={this.handleSubmit}>
              <div><input className="login-input" type="text" name="email" onChange={this.handleChange} placeholder="Email" /></div>
              <div><input className="login-input" name="regToken" onChange={this.handleChange} placeholder="Registration token" /></div>
              <div><input className="login-input" type="password" name="password1" onChange={this.handleChange} placeholder="Password" /></div>
              <div><input className="login-input" type="password" name="password2" onChange={this.handleChange} placeholder="Confirm password" /></div>
              <button type="submit" className="login-button">Create Account</button>
            </form>
            <div className="login-hr"><hr /></div>
            <Link to="/login" className="login-create-account">Sign In</Link>
          </div>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering,
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
