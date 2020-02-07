import {SET_LOADING_SUCCESS, SET_SELECTED_TAB_SUCCESS} from '../actionTypes';
import {FIND_PLACE_SCREEN} from '../../navigation/Screens';
const initialState = {
  loading: false,
  componentId: FIND_PLACE_SCREEN,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_SUCCESS:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_SELECTED_TAB_SUCCESS:
      return {
        ...state,
        componentId: action.componentId,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
