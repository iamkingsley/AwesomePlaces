import { Navigation } from "react-native-navigation";

import AuthScreen from "./src/screens/Auth/Auth";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import SharePlaceScreen  from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import goToAuthScreen from "./src/screens/GoToAuthScreen/goToAuthScreen"

import configureStore from "./src/store/configureStore";
import withReduxStoreWrapper from "./src/screens/withReduxStoreWrapper";

// Configure the Redux Store
const store = configureStore();

// Register Screens
Navigation.registerComponent("awesome-places.SideDrawer", () => SideDrawer);
Navigation.registerComponent("awesome-places.AuthScreen", withReduxStoreWrapper(AuthScreen, store));
Navigation.registerComponentWithRedux("awesome-places.PlaceDetailScreen", withReduxStoreWrapper(PlaceDetailScreen, store));
Navigation.registerComponentWithRedux("awesome-places.SharePlaceScreen", withReduxStoreWrapper(SharePlaceScreen, store));
Navigation.registerComponentWithRedux("awesome-places.FindPlaceScreen", withReduxStoreWrapper(FindPlaceScreen, store));

Navigation.events().registerAppLaunchedListener(() => {
  goToAuthScreen();
});
