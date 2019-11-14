import {TRY_LOGIN_SUCCESS} from '../actionTypes';

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
    default:
      return state;
  }
};

export default reducer;
