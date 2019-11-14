// Imports: Dependencies
import {takeLatest, put} from 'redux-saga/effects';
import {TRY_LOGIN, TRY_LOGIN_SUCCESS} from '../actionTypes';

function* login(action) {
  yield put({
    type: TRY_LOGIN_SUCCESS,
    email: action.email,
  });
}

// Generator: Watch add place
export function* watchLogin() {
  // Take Last Action
  yield takeLatest(TRY_LOGIN, login);
}
