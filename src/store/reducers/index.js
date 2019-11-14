// Imports: Dependencies
import {combineReducers} from 'redux';

// Imports: Reducers
import placesReducer from './places';
import authReducer from './auth';

// Redux: Root Reducer
const rootReducer = combineReducers({
  auth: authReducer,
  places: placesReducer,
});

// Exports
export default rootReducer;
