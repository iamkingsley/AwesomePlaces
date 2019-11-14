import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

// Imports: Redux Root Reducer
import rootReducer from './reducers';
// Imports: Redux Root Saga
import rootSaga from './sagas';

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, createLogger()),
  );
  // Middleware: Redux Saga
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
