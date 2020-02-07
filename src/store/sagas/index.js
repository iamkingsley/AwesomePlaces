// Imports: Dependencies
import {all, fork} from 'redux-saga/effects';

// Imports: Redux Sagas
import {watchAddPlace, watchDeletePlace, watchSelectedTabComp} from './places';
import {watchLogin, watchLogout} from './auth';

// Redux Saga: Root Saga
export default function* rootSaga() {
  yield all([
    fork(watchAddPlace),
    fork(watchDeletePlace),
    fork(watchSelectedTabComp),
    fork(watchLogin),
    fork(watchLogout),
  ]);
}
