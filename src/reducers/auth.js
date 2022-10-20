import baseState from '../store/baseState';
import {
    USER__LOGIN
} from '../actions/action';

export default (state = baseState.authData, { payload, type, error }) => {
  switch (type) {

    case USER__LOGIN.REQUEST:
      return {
        ...state,
      };

    case USER__LOGIN.SUCCESS:
      return {
        ...state,
        loginDetails: payload.data
      };

    default:
      return state;
  }
};