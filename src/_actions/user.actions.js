import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
};

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));

    userService.login(email, password)
      .then(
        (user) => {
          dispatch(success(user));
          history.push('/');
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.successAlertError(error.toString()));
        },
      );
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }
}

function logout() {
  return (dispatch) => {
    dispatch(request());

    userService.logout();
    dispatch(success());
  };

  function request() { return { type: userConstants.LOGOUT_REQUEST }; }
  function success() { return { type: userConstants.LOGOUT_SUCCESS }; }
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user)
      .then(
        () => {
          dispatch(success());
          history.push('/login');
          dispatch(alertActions.success('Registration successful'));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };

  function request(usr) { return { type: userConstants.REGISTER_REQUEST, usr }; }
  function success(usr) { return { type: userConstants.REGISTER_SUCCESS, usr }; }
  function failure(err) { return { type: userConstants.REGISTER_FAILURE, err }; }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString())),
      );
  };

  function request() { return { type: userConstants.GETALL_REQUEST }; }
  function success(users) { return { type: userConstants.GETALL_SUCCESS, users }; }
  function failure(error) { return { type: userConstants.GETALL_FAILURE, error }; }
}

function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id)
      .then(
        () => dispatch(success(id)),
        error => dispatch(failure(id, error.toString())),
      );
  };

  function request(_id) { return { type: userConstants.DELETE_REQUEST, _id }; }
  function success(_id) { return { type: userConstants.DELETE_SUCCESS, _id }; }
  function failure(_id, error) { return { type: userConstants.DELETE_FAILURE, _id, error }; }
}
