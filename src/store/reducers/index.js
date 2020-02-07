// Imports: Dependencies
import {combineReducers} from 'redux';

// Imports: Reducers
import appReducer from './app';
import placesReducer from './places';
import authReducer from './auth';

// Redux: Root Reducer
const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  places: placesReducer,
});

// Exports
export default rootReducer;
