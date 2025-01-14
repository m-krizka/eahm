/* global localStorage */

import { userConstants } from '../_constants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT_REQUEST:
      return {
        loggingOut: true,
      };
    case userConstants.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}
