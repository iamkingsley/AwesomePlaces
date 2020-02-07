// Imports: Dependencies
import {takeLatest, put} from 'redux-saga/effects';
import {
  ADD_PLACE,
  ADD_PLACE_SUCCESS,
  SET_SELECTED_TAB,
  SET_SELECTED_TAB_SUCCESS,
  DELETE_PLACE,
  DELETE_PLACE_SUCCESS,
} from '../actionTypes';

// add place Async
function* addPlaceAsync(action) {
  try {
    // Dispatch Action To Redux Store
    yield put({
      type: ADD_PLACE_SUCCESS,
      name: action.placeName,
      location: action.location,
      image: action.image,
    });
  } catch (error) {
    console.log(error);
  }
}

// Generator: Watch add place
export function* watchAddPlace() {
  // Take Last Action
  yield takeLatest(ADD_PLACE, addPlaceAsync);
}

// remove place Async
function* deletePlace(action) {
  try {
    // Dispatch Action To Redux Store
    yield put({
      type: DELETE_PLACE_SUCCESS,
      placeKey: action.key,
    });
  } catch (error) {
    console.log(error);
  }
}

// Generator: Watch delete place
export function* watchDeletePlace() {
  // Take Last Action
  yield takeLatest(DELETE_PLACE, deletePlace);
}

function* setSelectedTabComp(action) {
  try {
    // Dispatch Action To Redux Store
    yield put({
      type: SET_SELECTED_TAB_SUCCESS,
      componentId: action.componentId,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* watchSelectedTabComp() {
  yield takeLatest(SET_SELECTED_TAB, setSelectedTabComp);
}
