// @flow

import {Navigation} from 'react-native-navigation';

import configureStore from '../store/configureStore';
import withReduxStoreWrapper from './withReduxStoreWrapper';

// Configure the Redux Store
const store = configureStore();

import {
  AuthScreen,
  PlaceDetailScreen,
  SharePlaceScreen,
  FindPlaceScreen,
  SideDrawer,
} from '../screens';

import {
  AUTH_SCREEN,
  SIDE_DRAWER,
  PLACE_DETAIL_SCREEN,
  SHARE_PLACE_SCREEN,
  FIND_PLACE_SCREEN,
} from './Screens';

// Register Screens
export default function() {
  Navigation.registerComponent(
    SIDE_DRAWER,
    withReduxStoreWrapper(SideDrawer, store),
  );
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
