// Imports: Dependencies
import {takeLatest, put, delay} from 'redux-saga/effects';
import {
  TRY_LOGIN,
  TRY_LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  SET_LOADING_SUCCESS,
} from '../actionTypes';

import {pushAuthScreen, pushTabScreen} from '../../navigation';

function* login(action) {
  // set loading to TRUE
  yield put({
    type: SET_LOADING_SUCCESS,
    loading: true,
  });
  // mock API request delay
  yield delay(2000);
  // update user's authentication state
  yield put({
    type: TRY_LOGIN_SUCCESS,
    email: action.email,
  });
  // set loading to FALSE
  yield put({
    type: SET_LOADING_SUCCESS,
    loading: false,
  });
  yield pushTabScreen();
}
function* logout() {
  yield put({
    type: LOGOUT_SUCCESS,
    email: '',
  });
  yield pushAuthScreen();
}

// Generator: Watch add place
export function* watchLogin() {
  yield takeLatest(TRY_LOGIN, login);
}
export function* watchLogout() {
  yield takeLatest(LOGOUT, logout);
}
