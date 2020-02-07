import {TRY_LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../actionTypes';

const initialState = {
  authenticated: false,
  email: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TRY_LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        email: action.email,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
        email: '',
      };
    default:
      return state;
  }
};

export default reducer;
