// @flow

import React from 'react';
import {Provider} from 'react-redux';

import {Navigation} from 'react-native-navigation';

import configureStore from '../store/configureStore';

// Configure the Redux Store
const store = configureStore();

import {
  AuthScreen,
  PlaceDetailScreen,
  SharePlaceScreen,
  FindPlaceScreen,
  SideDrawer,
  Settings,
} from '../screens';

import {
  AUTH_SCREEN,
  SIDE_DRAWER,
  PLACE_DETAIL_SCREEN,
  SHARE_PLACE_SCREEN,
  FIND_PLACE_SCREEN,
  SETTINGS_SCREEN,
} from './Screens';

// Create Redux Wrapper
const withReduxStoreWrapper = (ReduxScreen, reduxStore) => () => props => (
  <Provider store={reduxStore}>
    <ReduxScreen {...props} />
  </Provider>
);

// Register Screens
export default function() {
  Navigation.registerComponent(
    SIDE_DRAWER,
    withReduxStoreWrapper(SideDrawer, store),
  );
  Navigation.registerComponent(SETTINGS_SCREEN, () => Settings);
  Navigation.registerComponent(
    AUTH_SCREEN,
    withReduxStoreWrapper(AuthScreen, store),
  );
  Navigation.registerComponentWithRedux(
    PLACE_DETAIL_SCREEN,
    withReduxStoreWrapper(PlaceDetailScreen, store),
  );
  Navigation.registerComponentWithRedux(
    SHARE_PLACE_SCREEN,
    withReduxStoreWrapper(SharePlaceScreen, store),
  );
  Navigation.registerComponentWithRedux(
    FIND_PLACE_SCREEN,
    withReduxStoreWrapper(FindPlaceScreen, store),
  );
  console.info('All screens have been registered...');
}
