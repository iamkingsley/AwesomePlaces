// Imports: Dependencies
import {all, fork} from 'redux-saga/effects';

// Imports: Redux Sagas
import {watchAddPlace, watchDeletePlace} from './places';
import {watchLogin} from './auth';

// Redux Saga: Root Saga
export default function* rootSaga() {
  yield all([fork(watchAddPlace), fork(watchDeletePlace), fork(watchLogin)]);
}
