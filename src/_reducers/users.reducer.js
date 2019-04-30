import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, refreshed: true, refreshing: false } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};



      
    case userConstants.REFRESH_REQUEST:
      return {
        refreshing: true,
        refreshed: false
      };
    case userConstants.REFRESH_SUCCESS:
      return {
        refreshed: true,
        refreshing: false
      };
    case userConstants.REFRESH_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}